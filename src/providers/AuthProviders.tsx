import { FC, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { isUserModelLocal, useAuth } from '@/hooks/authentication/useAuth.hook';
import { ApiContext } from '@/stores/contexts/api.context';
import { useAppDispatch } from '@/stores/store.hooks';
import { setAuthentication } from '@/stores/slices/Authentication.slice';
import { Redirect } from '@/routes/redirect';
import LocalStorageRepository from '@/utils/localStorage.repository';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { dashboardSelector, setTransactions } from '@/stores/slices/Dashboard.slice';
import { LucraGuides } from '@/features/userGuides/LucraGuides';

interface AuthCheckProviderProps {}

export const AuthCheckProvider: FC<AuthCheckProviderProps> = ({}) => {
  const apis = useContext(ApiContext);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAuth();
  const { dateRange } = dashboardSelector();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldRefreshTransactions, setShouldRefreshTransactions] = useState<boolean>(false);

  const hasAuthToken = LocalStorageRepository.getUserToken();

  useEffect(() => {
    if (shouldRefreshTransactions) {
      setTimeout(() => {
        console.log('REFRESHING TRANSACTIONS');
        apis.transactionApi.GetTransactions(dateRange.startDate, dateRange.endDate).then((data) => {
          dispatch(setTransactions(data.transactions));
        });
      }, 10000);
    }
  }, [shouldRefreshTransactions]);

  useEffect(() => {
    let isMounted = true;
    if (!isUserModelLocal(user)) {
      apis.authApi
        .getLoggedInUser()
        .then((res) => {
          if (!isMounted) return;

          const { user, accessToken, doesNeedSync } = res;
          if (doesNeedSync) {
            setShouldRefreshTransactions(true);
          }
          dispatch(
            setAuthentication({
              userId: user.userId,
              token: accessToken,
              phoneNumber: user.phoneNumber,
              email: user.email,
              name: user.name,
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

  if (isLoading && hasAuthToken)
    return (
      <LoadingContainer>
        <LoadingComponent maxHeight="30vh" />
      </LoadingContainer>
    );

  //When in local environment, skip the authentication check (When saving changes to slices youll be redirected to login page even though youre authenticated due to race condition)
  // if (envHelper.isLocal) return <Outlet />;

  if (!isAuthenticated) {
    // LOGOUT REQUEST
    return <Redirect />;
  }

  return (
    <>
      <Outlet />
      <LucraGuides />
    </>
  );
};

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
