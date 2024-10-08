import { FC, useContext } from 'react';
import styled from 'styled-components';
import { FeatureFlagContext } from '@/stores/contexts/featureFlag.context';

interface AccountsHeaderTabsProps {
  currentTab: accountHeaderTabs;
  changeTab: (tabType: accountHeaderTabs) => void;
}

export type accountHeaderTabs = 'depository' | 'credit' | 'investment';

export const AccountsHeaderTabs: FC<AccountsHeaderTabsProps> = ({ changeTab, currentTab }) => {
  const { isAccountsInvestmentEnabled } = useContext(FeatureFlagContext);

  return (
    <Styles.container>
      <Styles.tab
        $isActive={currentTab == 'depository' ? 'true' : 'false'}
        onClick={() => changeTab('depository')}
      >
        Depository
      </Styles.tab>
      <Styles.tab
        $isActive={currentTab == 'credit' ? 'true' : 'false'}
        onClick={() => changeTab('credit')}
      >
        Credit Cards
      </Styles.tab>
      {isAccountsInvestmentEnabled && (
        <Styles.tab
          $isActive={currentTab == 'investment' ? 'true' : 'false'}
          onClick={() => changeTab('investment')}
        >
          Investment
        </Styles.tab>
      )}
    </Styles.container>
  );
};

const Styles = {
  container: styled.div`
    display: flex;
    border-bottom: solid 1px #e2e2e2;
    margin-bottom: 1rem;
    width: 100%;
  `,
  tab: styled.div<{ $isActive: string }>`
    flex: 1;
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    border-bottom: 2px solid ${(props) => (props.$isActive === 'true' ? '#333333' : 'transparent')};
    color: ${(props) => (props.$isActive === 'true' ? '#333333' : '#9B9B9B')};
    text-align: center; /* Center text horizontally */
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  `,
};
