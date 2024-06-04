export interface IBankAccount {
  id: string;
  accessAccountId: string;
  accountId: string;
  institutionDisplayName: string;
  institutionId: string;
  type: string;
  subType: string;
  mask: string;
  bankInstitution?: IBankInstitution;
}

export interface IBankInstitution {
  name?: string;
  website?: string;
  logo?: string;
  primaryColor?: string;
}
