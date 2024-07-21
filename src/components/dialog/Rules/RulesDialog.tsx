import { FC, useContext, useState } from 'react';
import styled from 'styled-components';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { useTransactionRules } from '@/hooks/dashboard/useTranscriptionRules.hook';
import { Button } from '@/atoms/button/Button';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { ITransactionRule } from '@/types/models/rules/transaction.rule.type';
import { ApiContext } from '@/stores/contexts/api.context';
import { EditOrAddRule } from './NewRule';

interface RulesDialogProps extends DialogProps {}

export const RulesDialog: FC<RulesDialogProps> = (props) => {
  const [isNewRule, setIsNewRule] = useState(false);
  const { rulesApi } = useContext(ApiContext);
  const [rules, isFetchingRules] = useTransactionRules();

  const toggleNewRule = () => {
    setIsNewRule((prev) => !prev);
  };

  function SaveRuleCb(rule: ITransactionRule) {
    console.log('SAVE RULE', rule);
    rulesApi.SaveTransactionRule(rule).then(() => {
      setIsNewRule(false);
    });
  }

  if (isFetchingRules) {
    return <LoadingComponent loadingText="Fetching Rules..." />;
  }

  return (
    <DialogContainer {...props} width="auto" enableFooter={false} headerText="Rules">
      <Styles.container>
        <h1>Rules Dialog</h1>

        <Styles.rulesContainer>
          {rules.map((rule) => {
            return (
              <Styles.ruleContainer key={rule.id}>
                <EditOrAddRule rule={rule} saveRuleCb={SaveRuleCb} />
              </Styles.ruleContainer>
            );
          })}
          {isNewRule && <EditOrAddRule saveRuleCb={SaveRuleCb} />}
          <Button onClick={toggleNewRule}>New Rule</Button>
        </Styles.rulesContainer>
      </Styles.container>
    </DialogContainer>
  );
};

const Styles = {
  container: styled.div`
    width: 100%;
    padding-bottom: 1rem;
    max-height: 600px;
  `,
  rulesContainer: styled.div``,
  ruleContainer: styled.div``,
};
