import { FC, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { useTransactionRules } from '@/hooks/dashboard/useTranscriptionRules.hook';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { ITransactionRule } from '@/types/models/rules/transaction.rule.type';
import { ApiContext } from '@/stores/contexts/api.context';
import { EditOrAddRuleV2 } from './NewRuleV2';
import { RuleContainer } from './RuleContainer';

interface RulesDialogProps extends DialogProps {}

export const RulesDialog: FC<RulesDialogProps> = (props) => {
  const [containerRef] = useAutoAnimate();

  const [rulesCacheBuster, setRulesCacheBuster] = useState<string>();
  const [isNewOrEdit, setIsNewOrEdit] = useState(false);
  const [ruleToEdit, setRuleToEdit] = useState<ITransactionRule>();

  const { rulesApi } = useContext(ApiContext);
  const [rules, isFetchingRules] = useTransactionRules(rulesCacheBuster);

  useEffect(() => {
    if (!isNewOrEdit) {
      setRuleToEdit(undefined);
    }
  }, [isNewOrEdit]);

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

  function editRuleCb(ruleIndex: number) {
    setRuleToEdit(rules[ruleIndex]);
    toggleNewOrEditRule();
  }

  function SaveRuleCb(rule: ITransactionRule) {
    rulesApi.SaveTransactionRule(rule).then(() => {
      setIsNewOrEdit(false);
      setRulesCacheBuster(new Date().getTime().toString());
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
            {isNewOrEdit && (
              <EditOrAddRuleV2 saveRuleCb={SaveRuleCb} cancelCb={cancelCb} rule={ruleToEdit} />
            )}
            {!isNewOrEdit && (
              <Styles.rulesList>
                {rules.map((rule, index) => (
                  <RuleContainer index={index} key={rule.id} rule={rule} editCb={editRuleCb} />
                ))}
              </Styles.rulesList>
            )}
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
  rulesList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    max-height: 40vh;
  `,
};
