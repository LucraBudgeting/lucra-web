import { FC, useState } from 'react';
import styled from 'styled-components';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { useAccounts } from '@/hooks/dashboard/useAccounts.hook';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { LinkPlaid, informParentCbStatus } from '@/components/bank/plaid/Link.Plaid';
import { IBankAccount } from '@/types/models/bank/BankAccount';
import { AccountsHeader } from './AccountsHeader';
import { Chevron } from '@/assets/chevron';
import { formatAsMoney } from '@/utils/formatAsMoney';
import colors from '@/assets/theme/colors';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { AccountItem } from './AccountItem';

interface AccountsDialogProps extends DialogProps {}

const depositoryAccounts = ['checking', 'savings', 'investment'];
const debtAccounts = ['creditcard', 'loan'];

const startOpen = false;

export const AccountsDialog: FC<AccountsDialogProps> = (props) => {
  const [containerRef] = useAutoAnimate();
  const [depositoryContainerRef] = useAutoAnimate();
  const [creditContainerRef] = useAutoAnimate();

  const [accountsCacheBuster, setAccountsCacheBuster] = useState<string>();
  const [accounts, isFetchingAccounts] = useAccounts(accountsCacheBuster);
  const [showDepository, setShowDepository] = useState<boolean>(startOpen);
  const [showCredit, setShowCredit] = useState<boolean>(startOpen);

  const depositoryAccountsList = accounts.filter((account) =>
    depositoryAccounts.includes(account.type.toLowerCase())
  );
  const creditAccountsList = accounts.filter((account) =>
    debtAccounts.includes(account.type.toLowerCase())
  );

  const totalDepository = depositoryAccountsList.reduce((acc, account) => {
    return acc + (account.accountBalance?.currentBalance ?? 0);
  }, 0);

  const totalDebts = creditAccountsList.reduce((acc, account) => {
    return acc + (account.accountBalance?.currentBalance ?? 0);
  }, 0);

  const [isPlaidReady, setIsPlaidReady] = useState<boolean>(false);

  function accountLinkStatusCb(status: informParentCbStatus) {
    if (status === 'success') {
      setAccountsCacheBuster(new Date().getTime().toString());
    }
  }

  function isReadyCb(ready: boolean) {
    setIsPlaidReady(ready);
  }

  function toggleDepository() {
    setShowDepository(!showDepository);
  }

  function toggleCredit() {
    setShowCredit(!showCredit);
  }

  return (
    <DialogContainer {...props} enableFooter={false} headerText="Accounts">
      <Styles.container ref={containerRef}>
        <Styles.accountListContainer>
          {isFetchingAccounts && <LoadingComponent loadingText="Fetching Accounts..." />}
          {!isFetchingAccounts && (
            <>
              <AccountsHeader totalDepository={totalDepository} totalDebts={totalDebts} />
              <Styles.accountTypeListContainer>
                <Styles.accountTypeContainer ref={depositoryContainerRef}>
                  <Styles.accountTypeHeader onClick={toggleDepository}>
                    <Chevron direction={showDepository ? 'up' : 'right'} />
                    <h3>Depository</h3>
                    <p>{formatAsMoney(totalDepository)}</p>
                  </Styles.accountTypeHeader>
                  {showDepository && (
                    <Styles.accountListContainer>
                      {depositoryAccountsList.map((account, i) => (
                        <AccountItem key={i} account={account} />
                      ))}
                    </Styles.accountListContainer>
                  )}
                </Styles.accountTypeContainer>
                <Styles.accountTypeContainer ref={creditContainerRef}>
                  <Styles.accountTypeHeader onClick={toggleCredit}>
                    <Chevron direction={showDepository ? 'up' : 'right'} />
                    <h3>Credit Cards</h3>
                    <p>{formatAsMoney(totalDebts)}</p>
                  </Styles.accountTypeHeader>
                  {showCredit && (
                    <Styles.accountListContainer>
                      {creditAccountsList.map((account, i) => (
                        <AccountItem key={i} account={account} />
                      ))}
                    </Styles.accountListContainer>
                  )}
                </Styles.accountTypeContainer>
              </Styles.accountTypeListContainer>
            </>
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
  accountTypeListContainer: styled.div`
    margin-top: 1rem;
  `,
  accountTypeContainer: styled.div``,
  accountTypeHeader: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    h3 {
      color: ${colors.black.main};
      font-weight: 600;
      font-size: 18px;
    }

    p {
      color: ${colors.grey[500]};
      font-weight: 500;
      font-size: 14px;
    }
  `,
  accountListContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
  accountItemContainer: styled.div``,
  addAccountButton: styled.button`
    background-color: ${colors.black.main};
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
