import { FC, useContext, useState } from 'react';
import styled from 'styled-components';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { useTransactionRules } from '@/hooks/dashboard/useTranscriptionRules.hook';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { ITransactionRule } from '@/types/models/rules/transaction.rule.type';
import { ApiContext } from '@/stores/contexts/api.context';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { EditOrAddRuleV2 } from './NewRuleV2';
import { getConditionDisplayName } from './rule.utils';

interface RulesDialogProps extends DialogProps {}

export const RulesDialog: FC<RulesDialogProps> = (props) => {
  const { categoryDictionary } = dashboardSelector();
  const [containerRef] = useAutoAnimate();
  const [isNewOrEdit, setIsNewOrEdit] = useState(false);
  const { rulesApi } = useContext(ApiContext);
  const [rules, isFetchingRules] = useTransactionRules();

  const toggleNewOrEditRule = () => {
    setIsNewOrEdit((prev) => !prev);
  };

  const succesCb = (rule?: ITransactionRule) => {
    if (!isNewOrEdit) {
      toggleNewOrEditRule();
    } else if (rule) {
      SaveRuleCb(rule);
    } else {
      console.error('Rule is not defined');
    }
  };

  const cancelCb = () => {
    if (isNewOrEdit) {
      toggleNewOrEditRule();
    } else {
      props.closeCb();
    }
  };

  function SaveRuleCb(rule: ITransactionRule) {
    rulesApi.SaveTransactionRule(rule).then(() => {
      setIsNewOrEdit(false);
    });
  }

  return (
    <DialogContainer
      {...props}
      enableFooter={!isNewOrEdit}
      headerText="Rules"
      closeText="Cancel"
      nextText={isNewOrEdit ? 'Save' : '+ New rule'}
      closeCb={cancelCb}
      successCb={succesCb}
    >
      <Styles.container ref={containerRef}>
        {isFetchingRules ? (
          <LoadingComponent loadingText="Fetching Rules..." />
        ) : (
          <Styles.rulesContainer>
            {isNewOrEdit && <EditOrAddRuleV2 saveRuleCb={SaveRuleCb} cancelCb={cancelCb} />}
            {!isNewOrEdit &&
              rules.map((rule) => {
                const { operator, value } =
                  rule?.parsedCondition?.conditionGroups[0]?.conditions[0] ?? {};
                return (
                  <Styles.ruleContainer key={rule.id}>
                    <p>{rule.name}</p>
                    <p>
                      Merchant <code>{getConditionDisplayName(operator)}</code>: {value}
                    </p>
                    <p>
                      Category: {categoryDictionary[rule.parsedCondition.categoryId]?.label ?? ''}
                    </p>
                  </Styles.ruleContainer>
                );
              })}
          </Styles.rulesContainer>
        )}
      </Styles.container>
    </DialogContainer>
  );
};

const Styles = {
  container: styled.div`
    width: 100%;
    padding-bottom: 1rem;
    max-height: 600px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  rulesContainer: styled.div`
    width: 100%;
  `,
  ruleContainer: styled.div`
    width: Fill (452px) px;
    height: Hug (115px) px;
    padding: 20px 24px 20px 24px;
    gap: 20px;
    border-radius: 16px;
    opacity: 0px;
    background-color: #fbfafa;
  `,
};
