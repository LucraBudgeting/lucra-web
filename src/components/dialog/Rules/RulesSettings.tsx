import { FC } from 'react';
import { Checkbox } from '@/assets/checkbox';
import { IRuleSettings } from '@/types/models/rules/rule.type';

interface RulesSettingsProps {
  settings: IRuleSettings;
}

export const RulesSettings: FC<RulesSettingsProps> = ({ settings }) => {
  return (
    <div>
      RulesSettings
      <span style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
        <Checkbox status={settings?.autoApplyCategories ? 'success' : ''} /> Auto Apply Categories
      </span>
      <button>Overwrite categories with new rule settings</button>
    </div>
  );
};
