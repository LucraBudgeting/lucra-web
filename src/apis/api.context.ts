import { createContext } from 'react';
import { PokemonApi } from './pokemon.api';
import { AuthenticationApi } from './authentication/authentication.api';
import { BillingApi } from './billing/billing.api';
import { IBankApi } from './bank/IBankApi';
import { PlaidApi } from './bank/plaid.api';

interface Apis {
  pokemon: PokemonApi;
  billingApi: BillingApi;
  authentication: AuthenticationApi;
  plaidApi: PlaidApi;
  apiUrl: string;
}

const { VITE_ENV } = import.meta.env;

export const initializedApis: Apis = {
  pokemon: new PokemonApi(),
  billingApi: new BillingApi(),
  authentication: new AuthenticationApi(),
  plaidApi: new PlaidApi(),
  apiUrl: import.meta.env[`VITE_API_BASE_URL_${VITE_ENV}`],
};

export const ApiContext = createContext<Apis>(initializedApis);
