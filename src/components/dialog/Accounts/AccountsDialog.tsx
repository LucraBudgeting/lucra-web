import { FC, useState } from 'react';
import styled from 'styled-components';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { useAccounts } from '@/hooks/dashboard/useAccounts.hook';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { LinkPlaid, informParentCbStatus } from '@/components/bank/plaid/Link.Plaid';
import { IBankAccount } from '@/types/models/bank/BankAccount';
import { AccountsHeaderTabs } from './AccountsHeaderTabs';

interface AccountsDialogProps extends DialogProps {}

export type accountHeaderTabs = 'depository' | 'credit' | 'investment';

export const AccountsDialog: FC<AccountsDialogProps> = (props) => {
  const [accountsCacheBuster, setAccountsCacheBuster] = useState<string>();
  const [accounts, isFetchingAccounts] = useAccounts(accountsCacheBuster);

  const [currentTab, setCurrentTab] = useState<accountHeaderTabs>('depository');
  const [isPlaidReady, setIsPlaidReady] = useState<boolean>(false);

  function changeTab(tabType: accountHeaderTabs) {
    setCurrentTab(tabType);
  }

  function accountLinkStatusCb(status: informParentCbStatus) {
    if (status === 'success') {
      setAccountsCacheBuster(new Date().getTime().toString());
    }
  }

  function isReadyCb(ready: boolean) {
    setIsPlaidReady(ready);
  }

  const temp = accounts.map((account: IBankAccount) => {
    return {
      id: account.id,
      name: account.accountName,
      instit: account.institution?.displayName,
      type: account.type,
      balance: account.balance?.currentBalance,
    };
  });

  return (
    <DialogContainer {...props} enableFooter={false} headerText="Accounts">
      <Styles.container>
        <AccountsHeaderTabs currentTab={currentTab} changeTab={changeTab} />
        <Styles.accountListContainer>
          {isFetchingAccounts && <LoadingComponent loadingText="Fetching Accounts..." />}
          {!isFetchingAccounts && (
            <div>
              <pre>
                <code>{JSON.stringify(temp, null, 4)}</code>
              </pre>
            </div>
          )}
        </Styles.accountListContainer>
        <LinkPlaid informParent={accountLinkStatusCb} isReadyCb={isReadyCb}>
          <Styles.addAccountButton disabled={!isPlaidReady} id="plaid_add_account_btn">
            + Add account
          </Styles.addAccountButton>
        </LinkPlaid>
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
  accountListContainer: styled.div``,
  addAccountButton: styled.button`
    background-color: #333;
    border-radius: 0.5rem;
    color: white;
    cursor: pointer;
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
  `,
};
