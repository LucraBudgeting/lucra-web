import { FC, useContext } from 'react';
import styled from 'styled-components';
import { ITransactionRule } from '@/types/models/rules/transaction.rule.type';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { EditIcon } from '@/assets/edit-icon';
import { TrashIcon } from '@/assets/trash-icon';
import { ElipsesIcon } from '@/assets/elipses-icon';
import { ApiContext } from '@/stores/contexts/api.context';
import { getConditionDisplayName } from './rule.utils';

interface RuleContainerProps {
  index: number;
  rule: ITransactionRule;
  editCb: (ruleIndex: number) => void;
  cacheBustCb: () => void;
}

export const RuleContainer: FC<RuleContainerProps> = ({ index, rule, editCb, cacheBustCb }) => {
  const { rulesApi } = useContext(ApiContext);
  const { categoryDictionary } = dashboardSelector();

  const { operator } = rule?.parsedCondition?.conditionGroups[0]?.conditions[0] ?? {};

  const values =
    rule?.parsedCondition?.conditionGroups[0]?.conditions.map((condition) => condition.value) ?? [];

  function onEditClick() {
    editCb(index);
  }

  function onDeleteClick() {
    if (!rule.id) return;

    rulesApi.DeleteTransactionRule(rule.id).finally(() => {
      cacheBustCb();
    });
  }

  return (
    <Styled.ruleContainer>
      <Styled.actionIcons>
        <ElipsesIcon />
        <EditIcon onClick={onEditClick} />
        <TrashIcon onClick={onDeleteClick} />
      </Styled.actionIcons>
      <Styled.name>
        <p className="name">Name: </p>
        {rule.name}
      </Styled.name>
      <Styled.ruleInfoRow>
        <p className="start">If merchant name {getConditionDisplayName(operator)}:</p>
        <Styled.valuesContainer>
          {values.map((value, index) => (
            <Styled.valueChip key={index} color={generateChalkColors(1)[0]}>
              {value}
            </Styled.valueChip>
          ))}
        </Styled.valuesContainer>
      </Styled.ruleInfoRow>
      <Styled.ruleInfoRow>
        <p className="start">Then categorize as:</p>
        <p className="value">{categoryDictionary[rule.parsedCondition.categoryId]?.label ?? ''}</p>
      </Styled.ruleInfoRow>
    </Styled.ruleContainer>
  );
};

const Styled = {
  valueChip: styled.div<{ color: string }>`
    padding: 6px;
    border-radius: 6px;
    background-color: ${(props) => props.color};
  `,
  valuesContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  `,
  actionIcons: styled.div`
    position: absolute;
    top: 10px; /* Adjust position as needed */
    right: 10px; /* Adjust position as needed */
    display: flex;
    gap: 10px;
    cursor: pointer;
  `,
  ruleContainer: styled.div`
    padding: 20px 24px 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 16px;
    background-color: #fbfafa;
    position: relative;
  `,
  name: styled.h3`
    display: flex;
    .name {
      color: #707070;
      margin-right: 0.25rem;
    }
  `,
  ruleInfoRow: styled.div`
    display: flex;
    flex-direction: column;
    .start {
      color: #707070;
      margin-right: 0.25rem;
    }
  `,
};

function generateChalkColors(count: number): string[] {
  const baseColors = ['#FDFFE7', '#FFEEE4', '#E3F5FF', '#FFF8E1', '#E8F5E9', '#F3E5F5'];

  const lightenColor = (hex: string, percent: number): string => {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;

    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`;
  };

  return Array.from({ length: count }, () => {
    const baseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
    return lightenColor(baseColor, Math.random() * 10 - 5); // Slightly randomize the lightness
  });
}
