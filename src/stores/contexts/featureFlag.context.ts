import { createContext } from 'react';

interface IFeatureFlags {
  isBudgetHeaderProfileIconEnabled: boolean;

  [key: string]: boolean;
}

export const featureFlags: IFeatureFlags = {
  isBudgetHeaderProfileIconEnabled: false,
};

export const FeatureFlagContext = createContext<IFeatureFlags>(featureFlags);
