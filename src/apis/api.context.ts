import { createContext } from 'react';
import { PokemonApi } from './pokemon.api';
import { AuthenticationApi } from './authentication/authentication.api';
import { BillingApi } from './billing/billing.api';
import { QsPlaidApi } from './bank/plaid.qs.api';
import { PlaidApi } from './bank/plaid.api';
import { OnboardingApi } from './onboarding/onboarding.api';
import BankApi from './bank/bank.api';
import CategoryApi from './budget/category.api';

interface Apis {
  pokemon: PokemonApi;
  billingApi: BillingApi;
  onboardingApi: OnboardingApi;
  authentication: AuthenticationApi;
  qsPlaidApi: QsPlaidApi;
  PlaidApi: PlaidApi;
  apiUrl: string;
  bankApi: BankApi;
  categoryApi: CategoryApi;
}

const { VITE_ENV } = import.meta.env;

export const initializedApis: Apis = {
  pokemon: new PokemonApi(),
  billingApi: new BillingApi(),
  authentication: new AuthenticationApi(),
  qsPlaidApi: new QsPlaidApi(),
  PlaidApi: new PlaidApi(),
  onboardingApi: new OnboardingApi(),
  bankApi: new BankApi(),
  categoryApi: new CategoryApi(),
  apiUrl: import.meta.env[`VITE_API_BASE_URL_${VITE_ENV}`],
};

export const ApiContext = createContext<Apis>(initializedApis);
