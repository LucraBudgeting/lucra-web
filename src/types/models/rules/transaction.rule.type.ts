import { IConditionGroup, ICondition, IRule } from './rule.type';

export interface ITransactionRuleCondition {
  conditionGroups: ITransactionConditionGroup[];
  categoryId: string;
}

export interface ITransactionConditionGroup extends IConditionGroup {
  conditions: ITransactionCondition[];
}

export interface ITransactionCondition extends ICondition {}

export interface ITransactionRule extends IRule {
  parsedCondition: ITransactionRuleCondition;
}
