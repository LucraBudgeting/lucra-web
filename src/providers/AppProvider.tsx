import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/stores/store';
import { ApiContext, initializedApis } from '@/stores/contexts/api.context';
import { UserAgentContext, initializeUserAgent } from '@/stores/contexts/userAgent.context';
import { envHelper } from '@/utils/env.helper';
import { DarkLogoAnimated } from '@/assets/logos/Dark_Logo.animated';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  React.useEffect(() => {
    const isProd = envHelper.isProd;
    const docTitle = 'Lucra Budgeting';
    if (isProd) {
      document.title = docTitle;
    } else {
      document.title = `${envHelper.currentEnv} - ${docTitle}`;
    }
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
          <DarkLogoAnimated />
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
