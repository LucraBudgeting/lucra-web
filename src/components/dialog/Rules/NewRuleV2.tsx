import { ChangeEvent, FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { eConditionOperator, eConditionType } from '@/types/models/rules/rule.type';
import {
  ITransactionCondition,
  ITransactionRule,
} from '@/types/models/rules/transaction.rule.type';
import { BaseInput } from '@/atoms/input/BaseInput';
import { BaseSelect, ISelectOptionGroup } from '@/atoms/select/BaseSelect';
import { Button } from '@/atoms/button/Button';
import { Styled } from '@/atoms/dialog/Dialog.styles';
import { categoriesToGroups, categoryListToOptions } from '@/components/category/category.utils';
import colors from '@/assets/theme/colors';
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
const maxAllowedValues = 60;
const isAutoTagEnabled = true;

export const EditOrAddRuleV2: FC<EditOrAddRuleProps> = ({
  rule,
  saveRuleCb,
  cancelCb,
  categoryList,
}) => {
  const categoryListOptions = categoryListToOptions(categoryList);
  const { conditions } = rule?.parsedCondition?.conditionGroups[0] ?? newConditionGroup;
  const { operator } = conditions[0] ?? newCondition;

  const { debitCategories, creditCategories, transferCategory } = dashboardSelector();
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
  const [categoryOptionList, setCategoryOptionList] = useState<ISelectOptionGroup[]>([]);

  useEffect(() => {
    setCategoryOptionList(categoriesToGroups(debitCategories, creditCategories, transferCategory));
  }, [debitCategories, creditCategories, transferCategory]);

  function changeCategory(updatedValue: string) {
    setSelectedCategory(updatedValue);
  }

  function onConditionChange(updatedValue: string) {
    setConditionOperator(updatedValue as eConditionOperator);
  }

  function onAiTagChange(value: string, index: number) {
    setAiTagValues((prevArray) => {
      const newArray = [...prevArray];
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
      .filter((value) => value && value !== '0')
      .map((value) => ({
        field: aiTagField,
        operator: eConditionOperator.equals,
        value,
      }));

    const saveConditions = [...merchantConditions, ...aiTagConditions];

    const ruleToSave = {
      ...rule,
      name: 'New Rule',
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
        <p>If merchant name</p>
        <Styles.row>
          <Styles.conditionOperatorContainer id="condition-select">
            <BaseSelect
              sz="large"
              options={conditionOperatorOptions}
              value={getConditionOperatorFromName(conditionOperator)}
              onValueChange={onConditionChange}
            />
          </Styles.conditionOperatorContainer>
          <Styles.inputColumn width="65%">
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
      {isAutoTagEnabled && (
        <Styles.instructionSection>
          <p>Tags applied by banking institution</p>
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
      )}
      <Styles.instructionSection>
        <p>Then categorize as</p>
        <BaseSelect
          groups={categoryOptionList}
          value={selectedCategory}
          onValueChange={changeCategory}
          sz="large"
        />
      </Styles.instructionSection>

      <Styles.footer style={{ padding: '24px 0 0' }}>
        <Button label="Cancel" type="secondary" onClick={cancelCb} />
        <Button label="Save" onClick={saveRule} />
      </Styles.footer>
    </Styles.newRuleContainer>
  );
};

function AddValueBtn({ onClick }: { onClick: () => void }) {
  return <Button label="+ Add" onClick={onClick} type="empty" />;
}

const Styles = {
  newRuleContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-bottom: 1rem;
  `,
  instructionSection: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p {
      font-weight: 600;
      color: ${colors.grey[700]};
    }
  `,
  row: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
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
  conditionOperatorContainer: styled.div`
    width: 35%;
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
