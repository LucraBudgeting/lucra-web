import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@/atoms/button/Button';
import { BasicInput } from '@/atoms/input/BasicInput';
import { BasicSelect } from '@/atoms/select/BasicSelect';
import { AddIcon, CancelIcon } from '@/common/style';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { ICategory } from '@/types/basic/Category.type';
import { conditionOperator, conditionType } from '@/types/models/rules/rule.type';
import {
  ITransactionCondition,
  ITransactionConditionGroup,
  ITransactionRule,
} from '@/types/models/rules/transaction.rule.type';

interface EditOrAddRuleProps {
  rule?: ITransactionRule;
  saveRuleCb: (rule: ITransactionRule) => void;
}

const transactionFieldOptions = [
  { value: 'name', displayName: 'Name' },
  { value: 'merchantName', displayName: 'Merchant Name' },
];

const conditionTypeOptions = [
  { value: 'and', displayName: 'AND' },
  { value: 'or', displayName: 'OR' },
];

const conditionOperatorOptions = [
  { value: 'equals', displayName: 'Equals' },
  { value: 'contains', displayName: 'Contains' },
  { value: 'starts_with', displayName: 'Starts With' },
  { value: 'ends_with', displayName: 'Ends With' },
];

const newCondition: ITransactionCondition = {
  field: transactionFieldOptions[0].value,
  operator: conditionOperator.contains,
  value: '',
};

const newConditionGroup: ITransactionConditionGroup = {
  type: conditionType.and,
  conditions: [newCondition],
};

export const EditOrAddRule: FC<EditOrAddRuleProps> = ({ rule, saveRuleCb }) => {
  const { debitCategories, creditCategories } = dashboardSelector();
  const [conditionGroups, setConditionGroups] = useState<ITransactionConditionGroup[]>(
    rule?.parsedCondition?.conditionGroups ?? [newConditionGroup]
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    rule?.parsedCondition?.categoryId ?? ''
  );
  const [categoryOptionList, setCategoryOptionList] = useState<
    {
      value: string;
      displayName: string;
    }[]
  >([]);
  const [ruleName, setRuleName] = useState<string>(rule?.name ?? '');

  useEffect(() => {
    const categories = [...debitCategories, ...creditCategories];
    const options = categories.map((category: ICategory) => ({
      value: category.id!,
      displayName: category.label,
    }));
    setCategoryOptionList(options);

    if (!rule?.parsedCondition?.categoryId) {
      setSelectedCategory(options[0].value);
    }
  }, [debitCategories, creditCategories]);

  function saveRule() {
    const ruleToSave = {
      ...rule,
      name: ruleName,
      parsedCondition: {
        conditionGroups: conditionGroups,
        categoryId: selectedCategory,
      },
    } as ITransactionRule;

    saveRuleCb(ruleToSave);
  }

  function changeConditionType(updatedValue: string, groupIndex: number): void {
    const group = conditionGroups[groupIndex];
    group.type = updatedValue as conditionType;
    setConditionGroups([...conditionGroups]);
  }

  function onFieldChange(updatedValue: string, groupIndex: number, conditionIndex: number): void {
    const tempConditionGroup = [...conditionGroups];
    const condition = conditionGroups[groupIndex].conditions[
      conditionIndex
    ] as ITransactionCondition;
    tempConditionGroup[groupIndex].conditions[conditionIndex] = {
      ...condition,
      field: updatedValue,
    };
    setConditionGroups(tempConditionGroup);
  }

  function changeConditionOperator(
    updatedValue: string,
    groupIndex: number,
    conditionIndex: number
  ): void {
    const tempConditionGroup = [...conditionGroups];
    const condition = conditionGroups[groupIndex].conditions[
      conditionIndex
    ] as ITransactionCondition;
    tempConditionGroup[groupIndex].conditions[conditionIndex] = {
      ...condition,
      operator: updatedValue as conditionOperator,
    };
    setConditionGroups(tempConditionGroup);
  }

  function changeConditionValue(
    updatedValue: string,
    groupIndex: number,
    conditionIndex: number
  ): void {
    const tempConditionGroup = [...conditionGroups];
    const condition = conditionGroups[groupIndex].conditions[
      conditionIndex
    ] as ITransactionCondition;
    tempConditionGroup[groupIndex].conditions[conditionIndex] = {
      ...condition,
      value: updatedValue,
    };
    setConditionGroups(tempConditionGroup);
  }

  function addConditionRow() {
    const tempConditionGroup = [...conditionGroups];
    tempConditionGroup[0].conditions.push(newCondition);
    setConditionGroups(tempConditionGroup);
  }

  function addConditionGroup() {
    const tempConditionGroup = [...conditionGroups, newConditionGroup];
    setConditionGroups(tempConditionGroup);
  }

  function changeCategory(updatedValue: string) {
    setSelectedCategory(updatedValue);
  }

  function removeConditionGroup(groupIndex: number) {
    if (conditionGroups.length === 1) {
      return;
    }
    const tempConditionGroup = [...conditionGroups];
    tempConditionGroup.splice(groupIndex, 1);
    setConditionGroups(tempConditionGroup);
  }

  function changeRuleName(updatedValue: string): void {
    setRuleName(updatedValue);
  }

  console.log('condition groups', conditionGroups);

  return (
    <Styles.newRuleContainer>
      <BasicInput
        placeHolder={!rule?.name ? 'New Rule' : ''}
        value={ruleName}
        onValueChange={changeRuleName}
      />
      {conditionGroups.map((group, groupIndex) => (
        <div key={groupIndex}>
          <Styles.row>
            <p>Condition Type: </p>
            <BasicSelect
              value={group.type}
              onValueChange={(updatedValue: string) =>
                changeConditionType(updatedValue, groupIndex)
              }
              options={conditionTypeOptions}
            />
          </Styles.row>
          <Styles.column>
            {group.conditions.map((condition, conditionIndex) => (
              <div key={conditionIndex}>
                <Styles.row>
                  <p>Transaction</p>
                  <BasicSelect
                    value={getFieldValueFromName(condition.field)}
                    onValueChange={(updatedValue: string) =>
                      onFieldChange(updatedValue, groupIndex, conditionIndex)
                    }
                    options={transactionFieldOptions}
                  />
                  <BasicSelect
                    value={getConditionOperatorFromName(condition.operator)}
                    onValueChange={(updatedValue: string) =>
                      changeConditionOperator(updatedValue, groupIndex, conditionIndex)
                    }
                    options={conditionOperatorOptions}
                  />
                  <BasicInput
                    value={condition.value}
                    onValueChange={(updatedValue: string) => {
                      changeConditionValue(updatedValue, groupIndex, conditionIndex);
                    }}
                  />
                </Styles.row>
                <AddIcon onClick={addConditionRow} />
              </div>
            ))}
            <BasicSelect
              value={selectedCategory}
              onValueChange={changeCategory}
              options={categoryOptionList}
            />
            <CancelIcon onClick={() => removeConditionGroup(groupIndex)} />
          </Styles.column>
        </div>
      ))}

      <AddIcon onClick={addConditionGroup} />
      <Button onClick={saveRule}>Save Rule</Button>
    </Styles.newRuleContainer>
  );
};

const Styles = {
  newRuleContainer: styled.div`
    background-color: #88888843;
    margin: 0.5rem 0;
    width: 100%;
  `,
  row: styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 1rem;
  `,
  column: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 16px;
  `,
};

function getFieldValueFromName(name: string): string {
  return transactionFieldOptions.find((option) => option.displayName === name)?.value ?? name;
}

function getConditionOperatorFromName(operator: string): string {
  return (
    conditionOperatorOptions.find((option) => option.displayName === operator)?.value ?? operator
  );
}
