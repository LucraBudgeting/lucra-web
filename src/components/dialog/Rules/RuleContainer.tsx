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

  const { operator, value } = rule?.parsedCondition?.conditionGroups[0]?.conditions[0] ?? {};

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
      <Styled.name>{rule.name}</Styled.name>
      <Styled.ruleInfoRow>
        <p className="start">Merchant {getConditionDisplayName(operator)}:</p>
        <p className="value">{value}</p>
      </Styled.ruleInfoRow>
      <Styled.ruleInfoRow>
        <p className="start">Category:</p>
        <p className="value">{categoryDictionary[rule.parsedCondition.categoryId]?.label ?? ''}</p>
      </Styled.ruleInfoRow>
    </Styled.ruleContainer>
  );
};

const Styled = {
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
  name: styled.h3``,
  ruleInfoRow: styled.div`
    display: flex;
    .start {
      color: #707070;
      margin-right: 0.25rem;
    }

    .value {
      font-weight: 500;
    }
  `,
};

// {
//     return (
//       <Styles.ruleContainer key={rule.id}>
//
//       </Styles.ruleContainer>
//     );
//   }
