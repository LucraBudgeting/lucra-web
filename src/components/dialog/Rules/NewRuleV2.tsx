import { ChangeEvent, FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { ICategory } from '@/types/basic/Category.type';
import { eConditionOperator } from '@/types/models/rules/rule.type';
import { ITransactionRule } from '@/types/models/rules/transaction.rule.type';
import { BaseInput } from '@/atoms/input/BaseInput';
import { BaseSelect } from '@/atoms/select/BaseSelect';
import { Button } from '@/atoms/button/Button';
import { Styled } from '@/atoms/dialog/Dialog.styles';
import {
  conditionOperatorOptions,
  getConditionOperatorFromName,
  getFieldValueFromName,
  newCondition,
} from './rule.utils';

interface EditOrAddRuleProps {
  rule?: ITransactionRule;
  saveRuleCb: (rule: ITransactionRule) => void;
  cancelCb: () => void;
}

export const EditOrAddRuleV2: FC<EditOrAddRuleProps> = ({ rule, saveRuleCb, cancelCb }) => {
  const { operator, value } =
    rule?.parsedCondition?.conditionGroups[0]?.conditions[0] ?? newCondition;
  const { debitCategories, creditCategories } = dashboardSelector();
  const [merchantName, setMerchantName] = useState<string>(value ?? '');
  const [conditionOperator, setConditionOperator] = useState<eConditionOperator>(
    operator ?? eConditionOperator.equals
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

  function changeCategory(updatedValue: string) {
    setSelectedCategory(updatedValue);
  }

  function onRuleNameChange(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;

    if (value.length <= 35) {
      setRuleName(value as string);
    }
  }

  function onConditionChange(updatedValue: string) {
    setConditionOperator(updatedValue as eConditionOperator);
  }

  function onMerchantNameChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setMerchantName(value as string);
  }

  function saveRule() {
    const ruleToSave = {
      ...rule,
      name: ruleName,
      parsedCondition: {
        conditionGroups: [
          {
            type: 'and',
            conditions: [
              {
                field: getFieldValueFromName('name'),
                operator: getConditionOperatorFromName(conditionOperator),
                value: merchantName,
              },
            ],
          },
        ],
        categoryId: selectedCategory,
      },
    } as ITransactionRule;

    saveRuleCb(ruleToSave);
  }

  return (
    <Styles.newRuleContainer>
      <Styles.instructionSection>
        <p>Rule name</p>
        <BaseInput placeholder="Enter name" value={ruleName} onChange={onRuleNameChange} />
      </Styles.instructionSection>
      <Styles.instructionSection>
        <p>Merchant name</p>
        <Styles.row>
          <BaseSelect
            sz="medium"
            options={conditionOperatorOptions}
            value={getConditionOperatorFromName(conditionOperator)}
            onValueChange={onConditionChange}
          />
          <BaseInput
            placeholder="Enter merchant name"
            value={merchantName}
            onChange={onMerchantNameChange}
          />
        </Styles.row>
      </Styles.instructionSection>
      <Styles.instructionSection>
        <p>Category</p>
        <BaseSelect
          options={categoryOptionList}
          value={selectedCategory}
          onValueChange={changeCategory}
          sz="large"
        />
      </Styles.instructionSection>

      <Styles.footer style={{ padding: '24px 0 0' }}>
        <Button label="Cancel" primary={false} onClick={cancelCb} />
        <Button label="Save" onClick={saveRule} />
      </Styles.footer>
    </Styles.newRuleContainer>
  );
};

const Styles = {
  newRuleContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,
  instructionSection: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p {
      font-weight: 400;
    }
  `,
  row: styled.div`
    display: flex;
    gap: 16px;
  `,
  column: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 16px;
  `,
  ...Styled,
};
