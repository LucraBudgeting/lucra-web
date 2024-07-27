import { eConditionOperator, eConditionType } from '@/types/models/rules/rule.type';
import {
  ITransactionCondition,
  ITransactionConditionGroup,
} from '@/types/models/rules/transaction.rule.type';

export const transactionFieldOptions = [
  { value: 'name', displayName: 'Name' },
  { value: 'merchantName', displayName: 'Merchant Name' },
];

export const conditionOperatorOptions = [
  { value: 'equals', displayName: 'Equals' },
  { value: 'contains', displayName: 'Contains' },
  { value: 'starts_with', displayName: 'Starts With' },
  { value: 'ends_with', displayName: 'Ends With' },
];

export const newCondition: ITransactionCondition = {
  field: transactionFieldOptions[0].value,
  operator: eConditionOperator.contains,
  value: '',
};

export const newConditionGroup: ITransactionConditionGroup = {
  type: eConditionType.and,
  conditions: [newCondition],
};

export function getFieldValueFromName(name: string): string {
  return transactionFieldOptions.find((option) => option.displayName === name)?.value ?? name;
}

export function getConditionOperatorFromName(operator: string): string {
  return (
    conditionOperatorOptions.find((option) => option.displayName === operator)?.value ?? operator
  );
}

export function getConditionDisplayName(operator: string) {
  return (
    conditionOperatorOptions.find((option) => option.value === operator)?.displayName ?? operator
  );
}
