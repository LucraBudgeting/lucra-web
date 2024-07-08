import { FC, useState } from 'react';
import styled from 'styled-components';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { useAccounts } from '@/hooks/dashboard/useAccounts.hook';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { AccountsHeaderTabs } from './AccountsHeaderTabs';

interface AccountsDialogProps extends DialogProps {}

export type accountHeaderTabs = 'depository' | 'credit' | 'investment';

export const AccountsDialog: FC<AccountsDialogProps> = (props) => {
  const [accounts, isFetchingAccounts] = useAccounts();

  const [currentTab, setCurrentTab] = useState<accountHeaderTabs>('depository');

  function changeTab(tabType: accountHeaderTabs) {
    setCurrentTab(tabType);
  }

  return (
    <DialogContainer {...props} enableFooter={false} headerText="Accounts">
      <Styles.container>
        <AccountsHeaderTabs currentTab={currentTab} changeTab={changeTab} />
        <Styles.accountListContainer>
          {isFetchingAccounts && <LoadingComponent loadingText="Fetching Accounts..." />}
          {!isFetchingAccounts && (
            <div>
              <pre>
                <code>{JSON.stringify(accounts, null, 4)}</code>
              </pre>
            </div>
          )}
        </Styles.accountListContainer>
        <Styles.addAccountButton>ADD ACCOUNT BUTTON</Styles.addAccountButton>
      </Styles.container>
    </DialogContainer>
  );
};

const Styles = {
  container: styled.div`
    width: 100%;
  `,
  accountListContainer: styled.div``,
  addAccountButton: styled.div``,
};
