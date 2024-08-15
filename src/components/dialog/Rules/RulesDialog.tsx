import { FC, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { useTransactionRules } from '@/hooks/dashboard/useTranscriptionRules.hook';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { ITransactionRule } from '@/types/models/rules/transaction.rule.type';
import { ApiContext } from '@/stores/contexts/api.context';
import { SettingsCogFilledIcon } from '@/assets/settings-cog-filled';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { EditOrAddRuleV2 } from './NewRuleV2';
import { RuleContainer } from './RuleContainer';
import { RulesSettings } from './RulesSettings';

interface RulesDialogProps extends DialogProps {}

export const RulesDialog: FC<RulesDialogProps> = (props) => {
  const [containerRef] = useAutoAnimate();
  const [rulesContainerRef] = useAutoAnimate();

  const [rulesCacheBuster, setRulesCacheBuster] = useState<string>();
  const [isNewOrEdit, setIsNewOrEdit] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [ruleToEdit, setRuleToEdit] = useState<ITransactionRule>();

  const { rulesApi } = useContext(ApiContext);
  const {
    transactionRules: rules,
    categoryList,
    isFetching: isFetchingRules,
    ruleSettings,
  } = useTransactionRules(rulesCacheBuster);
  const { debitCategories, creditCategories } = dashboardSelector();

  const hasCategories =
    Object.keys(debitCategories).length > 0 || Object.keys(creditCategories).length > 0;

  useEffect(() => {
    if (!isNewOrEdit) {
      setRuleToEdit(undefined);
    }
  }, [isNewOrEdit]);

  const toggleNewOrEditRule = () => {
    setIsNewOrEdit((prev) => !prev);
  };

  const succesCb = (rule?: ITransactionRule) => {
    if (!hasCategories) {
      return;
    }

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
    } else if (showSettings) {
      setShowSettings(false);
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
      cacheBustCb();
    });
  }

  function cacheBustCb() {
    setRulesCacheBuster(new Date().getTime().toString());
  }

  function onSettingsClick() {
    setShowSettings(!showSettings);
  }

  return (
    <DialogContainer
      {...props}
      menuButtons={[
        {
          icon: <SettingsCogFilledIcon />,
          text: 'Settings',
          onClick: onSettingsClick,
        },
      ]}
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
        ) : showSettings ? (
          <RulesSettings settings={ruleSettings} />
        ) : (
          <Styles.rulesContainer ref={rulesContainerRef}>
            {isNewOrEdit && (
              <EditOrAddRuleV2
                saveRuleCb={SaveRuleCb}
                cancelCb={cancelCb}
                rule={ruleToEdit}
                categoryList={categoryList}
              />
            )}
            {!isNewOrEdit && (
              <Styles.rulesList>
                {!hasCategories && <p>Add a category please</p>}
                {rules.map((rule, index) => (
                  <RuleContainer
                    index={index}
                    key={rule.id}
                    rule={rule}
                    editCb={editRuleCb}
                    cacheBustCb={cacheBustCb}
                  />
                ))}
                {rules.length === 0 && <p>No rules found</p>}
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
    width: 100%;
    max-height: 70vh;
    background-color: white;
  `,
};
