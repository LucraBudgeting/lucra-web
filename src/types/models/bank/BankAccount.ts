export interface IBankAccount {
  id: string;
  accountName: string;
  accessAccountId: string;
  institutionId: string;
  type: string;
  subType: string;
  mask: string;
  accountBalance?: IBankBalance;
  bankInstitution?: IBankInstitution;
}

export interface IBankBalance {
  currentBalance: number;
  availableBalance: number;
  currency: string;
  lastUpdated: Date;
}

export interface IBankInstitution {
  name?: string;
  website?: string;
  logoUrl?: string;
  primaryColor?: string;
}
