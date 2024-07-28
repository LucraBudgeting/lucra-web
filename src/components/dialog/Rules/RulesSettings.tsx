import { FC, useContext } from 'react';
import { Checkbox } from '@/assets/checkbox';
import { IRuleSettings } from '@/types/models/rules/rule.type';
import { ApiContext } from '@/stores/contexts/api.context';

interface RulesSettingsProps {
  settings: IRuleSettings;
}

export const RulesSettings: FC<RulesSettingsProps> = ({ settings }) => {
  const { rulesApi } = useContext(ApiContext);

  function applyRules() {
    rulesApi.ApplyRulesToTransactions();
  }

  return (
    <div>
      RulesSettings
      <span style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
        <Checkbox status={settings?.autoApplyCategories ? 'success' : ''} /> Auto Apply Categories
      </span>
      <button onClick={applyRules}>Overwrite categories with new rule settings</button>
    </div>
  );
};
