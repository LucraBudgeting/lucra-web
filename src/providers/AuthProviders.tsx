import { FC, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { isUserModelLocal, useAuth } from '@/hooks/authentication/useAuth.hook';
import { ApiContext } from '@/stores/contexts/api.context';
import { useAppDispatch } from '@/stores/store.hooks';
import { setAuthentication } from '@/stores/slices/Authentication.slice';
import { Redirect } from '@/routes/redirect';
import LocalStorageRepository from '@/utils/localStorage.repository';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { envHelper } from '@/utils/env.helper';

interface AuthCheckProviderProps {}

export const AuthCheckProvider: FC<AuthCheckProviderProps> = ({}) => {
  const apis = useContext(ApiContext);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const hasAuthToken = LocalStorageRepository.getUserToken();

  useEffect(() => {
    let isMounted = true;
    if (!isUserModelLocal(user)) {
      apis.authApi
        .getLoggedInUser()
        .then((res) => {
          if (!isMounted) return;

          const { user, accessToken } = res;
          dispatch(
            setAuthentication({
              userId: user.userId,
              token: accessToken,
              phoneNumber: user.phoneNumber,
              email: user.email,
            })
          );
        })
        .finally(() => {
          if (!isMounted) return;

          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading && hasAuthToken) return <LoadingComponent loadingText="Authenticating User" />;

  //When in local environment, skip the authentication check (When saving changes to slices youll be redirected to login page even though youre authenticated due to race condition)
  if (envHelper.isLocal) return <Outlet />;

  if (!isAuthenticated) {
    // LOGOUT REQUEST
    return <Redirect />;
  }

  return <Outlet />;
};
