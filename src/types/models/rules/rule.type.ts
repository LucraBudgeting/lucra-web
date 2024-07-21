class Rule {
  id?: string;
  userId?: string;
  name: string = '';
  description?: string;
  isActive: boolean = true;
  model: RuleModels = RuleModels.Transaction;
}

export interface IRule extends Rule {}

export interface IPutRule {
  model: RuleModels;
  conditions: string;
  name: string;
}

export interface IPutRuleRequest<TCondition> {
  name: string;
  rule: TCondition;
}

enum RuleModels {
  Transaction,
}

export interface ICondition {
  field: string;
  operator: conditionOperator;
  value: any;
}

export interface IConditionGroup {
  type: conditionType;
  conditions: ICondition[];
}

export enum conditionOperator {
  contains = 'contains',
  equals = 'equals',
  starts_with = 'starts_with',
  ends_with = 'ends_with',
}

export enum conditionType {
  and = 'and',
  or = 'or',
}
