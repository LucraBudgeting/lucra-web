import { ChangeEvent, FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { ICategory } from '@/types/basic/Category.type';
import { eConditionOperator, eConditionType } from '@/types/models/rules/rule.type';
import {
  ITransactionCondition,
  ITransactionRule,
} from '@/types/models/rules/transaction.rule.type';
import { BaseInput } from '@/atoms/input/BaseInput';
import { BaseSelect, ISelectOptions } from '@/atoms/select/BaseSelect';
import { Button } from '@/atoms/button/Button';
import { Styled } from '@/atoms/dialog/Dialog.styles';
import {
  conditionOperatorOptions,
  getConditionOperatorFromName,
  newCondition,
  newConditionGroup,
} from './rule.utils';

interface EditOrAddRuleProps {
  rule?: ITransactionRule;
  saveRuleCb: (rule: ITransactionRule) => void;
  cancelCb: () => void;
  categoryList: Record<string, string>;
}

const merchantNameField = 'name';
const aiTagField = 'categoryDetailed';
const maxAllowedValues = 4;

export const EditOrAddRuleV2: FC<EditOrAddRuleProps> = ({
  rule,
  saveRuleCb,
  cancelCb,
  categoryList,
}) => {
  const categoryListOptions = categoryListToOptions(categoryList);
  const { conditions } = rule?.parsedCondition?.conditionGroups[0] ?? newConditionGroup;
  const { operator } = conditions[0] ?? newCondition;

  const { debitCategories, creditCategories } = dashboardSelector();
  // const [merchantName, setMerchantName] = useState<string>('');
  const [merchantNameValues, setMerchantNameValues] = useState<string[]>(
    getMerchantValues(conditions)
  );
  const [aiTagValues, setAiTagValues] = useState<string[]>(getAiTagValues(conditions));
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

  function onAiTagChange(value: string, index: number) {
    setAiTagValues((prevArray) => {
      const newArray = [...prevArray];
      console.log('value', value, newArray, index, index < newArray.length);
      if (index >= 0 && index <= newArray.length) {
        newArray[index] = value;
      }
      return newArray;
    });
  }

  function addAiTagValue() {
    if (aiTagValues.length > maxAllowedValues) return;

    setAiTagValues((prevArray) => [...prevArray, '']);
  }

  function onMerchantNameChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const value = e.target.value;

    setMerchantNameValues((prevArray) => {
      const newArray = [...prevArray];
      if (value.length <= 35 && index >= 0 && index <= newArray.length) {
        newArray[index] = value;
      }
      return newArray;
    });
  }

  function addMerchantValue() {
    if (merchantNameValues.length >= maxAllowedValues) return;
    setMerchantNameValues((prevArray) => [...prevArray, '']);
  }

  function saveRule() {
    const conditionOp = getConditionOperatorFromName(conditionOperator);
    const merchantConditions = merchantNameValues
      .filter((value) => value)
      .map((value) => ({
        field: merchantNameField,
        operator: conditionOp,
        value,
      }));
    const aiTagConditions = aiTagValues
      .filter((value) => value)
      .map((value) => ({
        field: aiTagField,
        operator: eConditionOperator.equals,
        value,
      }));

    const saveConditions = [...merchantConditions, ...aiTagConditions];

    const ruleToSave = {
      ...rule,
      name: ruleName,
      parsedCondition: {
        conditionGroups: [
          {
            type: eConditionType.or,
            conditions: saveConditions,
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
          <Styles.inputColumn>
            <BaseInput
              placeholder="Enter merchant name"
              value={merchantNameValues[0]}
              onChange={(e) => onMerchantNameChange(e, 0)}
            />
            {merchantNameValues.slice(1).map((value, index) => (
              <BaseInput
                key={index}
                placeholder="Enter merchant name"
                value={value}
                onChange={(e) => onMerchantNameChange(e, index + 1)}
              />
            ))}
            {merchantNameValues.length < maxAllowedValues &&
              merchantNameValues[merchantNameValues.length - 1] && (
                <AddValueBtn onClick={addMerchantValue} />
              )}
          </Styles.inputColumn>
        </Styles.row>
      </Styles.instructionSection>
      <Styles.instructionSection>
        <p>AI Auto-Tags </p>
        <Styles.row>
          <Styles.inputColumn width="100%">
            <BaseSelect
              value={aiTagValues[0]}
              onValueChange={(value) => onAiTagChange(value, 0)}
              options={categoryListOptions}
            />
            {aiTagValues.slice(1).map((value, index) => (
              <BaseSelect
                key={index}
                value={value}
                onValueChange={(value) => onAiTagChange(value, index + 1)}
                options={categoryListOptions}
              />
            ))}
            {aiTagValues.length < maxAllowedValues && aiTagValues[aiTagValues.length - 1] && (
              <AddValueBtn onClick={addAiTagValue} />
            )}
          </Styles.inputColumn>
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

function AddValueBtn({ onClick }: { onClick: () => void }) {
  return <Button label="+ Add" onClick={onClick} primary={false} />;
}

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
    align-items: flex-start;
    gap: 16px;
  `,
  column: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 16px;
  `,
  inputColumn: styled.div<{ width?: string }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: ${({ width }) => width ?? 'auto'};
  `,
  ...Styled,
};

function getMerchantValues(conditions: ITransactionCondition[]): string[] {
  if (!conditions.length) return [];

  return conditions
    .filter((condition) => condition.field == merchantNameField)
    .map((condition) => condition.value);
}

function getAiTagValues(conditions: ITransactionCondition[]): string[] {
  if (!conditions.length) return [];

  return conditions
    .filter((condition) => condition.field == aiTagField)
    .map((condition) => condition.value);
}

function categoryListToOptions(categoryList: Record<string, string>): ISelectOptions[] {
  const options = Object.keys(categoryList).map((key) => ({
    value: key,
    displayName: categoryList[key],
  }));
  options.unshift({ value: '', displayName: 'Select category' });

  return options;
}
