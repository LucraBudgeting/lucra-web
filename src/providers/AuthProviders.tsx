import { FC, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { isUserModelLocal, useAuth } from '@/hooks/authentication/useAuth.hook';
import { ApiContext } from '@/stores/contexts/api.context';
import { useAppDispatch } from '@/stores/store.hooks';
import { setAuthentication } from '@/stores/slices/Authentication.slice';
import { Redirect } from '@/routes/redirect';
import LocalStorageRepository from '@/utils/localStorage.repository';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';

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
      apis.authentication
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

  if (!isAuthenticated) {
    // LOGOUT REQUEST
    return <Redirect />;
  }

  return <Outlet />;
};
