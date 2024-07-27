import { createContext } from 'react';
import { PokemonApi } from '@/apis/pokemon.api';
import { AuthenticationApi } from '@/apis/authentication/authentication.api';
import { BillingApi } from '@/apis/billing/billing.api';
import { QsPlaidApi } from '@/apis/bank/plaid.qs.api';
import { PlaidApi } from '@/apis/bank/plaid.api';
import { OnboardingApi } from '@/apis/onboarding/onboarding.api';
import BankApi from '@/apis/bank/bank.api';
import CategoryApi from '@/apis/budget/category.api';
import TransactionApi from '@/apis/budget/transaction.api';
import RulesApi from '@/apis/rules/rules.api';

interface Apis {
  pokemon: PokemonApi;
  billingApi: BillingApi;
  onboardingApi: OnboardingApi;
  authApi: AuthenticationApi;
  qsPlaidApi: QsPlaidApi;
  PlaidApi: PlaidApi;
  apiUrl: string;
  bankApi: BankApi;
  categoryApi: CategoryApi;
  transactionApi: TransactionApi;
  rulesApi: RulesApi;
}

const { VITE_ENV } = import.meta.env;

export const initializedApis: Apis = {
  pokemon: new PokemonApi(),
  billingApi: new BillingApi(),
  authApi: new AuthenticationApi(),
  qsPlaidApi: new QsPlaidApi(),
  PlaidApi: new PlaidApi(),
  onboardingApi: new OnboardingApi(),
  bankApi: new BankApi(),
  categoryApi: new CategoryApi(),
  transactionApi: new TransactionApi(),
  rulesApi: new RulesApi(),
  apiUrl: import.meta.env[`VITE_API_BASE_URL_${VITE_ENV}`],
};

export const ApiContext = createContext<Apis>(initializedApis);
