import { createContext } from 'react';

const defaultValue = false;

export const featureFlags = {
  isBudgetHeaderProfileIconEnabled: defaultValue,
  isSettingsModalProfileEnabled: defaultValue,
  isSettingsModalAppearanceEnabled: defaultValue,
  isSettingsModalNotificationsEnabled: defaultValue,
  isAccountsInvestmentEnabled: defaultValue,
};

export const FeatureFlagContext = createContext(featureFlags);
