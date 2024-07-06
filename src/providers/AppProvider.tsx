import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/stores/store';
import { ApiContext, initializedApis } from '@/stores/contexts/api.context';
import { UserAgentContext, initializeUserAgent } from '@/stores/contexts/userAgent.context';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  React.useEffect(() => {
    document.title = 'Lucra Budgeting';
  }, []);
  return (
    <React.Suspense
      fallback={
        <div
          id="fallback-loader"
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </div>
      }
    >
      <UserAgentContext.Provider value={initializeUserAgent}>
        <ApiContext.Provider value={initializedApis}>
          <ReduxProvider store={store}>{children}</ReduxProvider>
        </ApiContext.Provider>
      </UserAgentContext.Provider>
    </React.Suspense>
  );
};
