import { ReactElement } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ApiContext, initializedApis } from '@/stores/contexts/api.context';
import { initialAuthenticationState } from '@/stores/slices/Authentication.slice';
import { initialPokemonState } from '@/stores/slices/Pokemon.slice';
import { SnackBarState } from '@/stores/slices/SnackBar.slice';
import { setupStore } from '@/stores/store';

export const defaultStore = setupStore({
  authentication: initialAuthenticationState,
  snackBar: SnackBarState,
  pokemon: initialPokemonState,
});

export type partialStore = Partial<ReturnType<typeof defaultStore.getState>>;

export function getComponent<T extends object>(
  Component: React.ComponentType<T>,
  store: partialStore = {},
  props: T = {} as T
): ReactElement {
  return (
    <ApiContext.Provider value={initializedApis}>
      <ReduxProvider
        store={{
          ...defaultStore,
          ...store,
        }}
      >
        <Component {...props} />
      </ReduxProvider>
    </ApiContext.Provider>
  );
}
