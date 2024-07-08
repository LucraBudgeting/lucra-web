export interface IBankAccount {
  id: string;
  linkSource: 'plaid';
  type: string;
  subType: string;
  mask: string;
  accountName: string;
  institution?: IBankInstitution;
  balance?: IBankBalance;
}

export interface IBankBalance {
  currentBalance: number;
  availableBalance: number;
  currency: string;
  lastUpdated: Date;
}

export interface IBankInstitution {
  displayName?: string;
  website?: string;
  logoUrl?: string;
  primaryColor?: string;
}
