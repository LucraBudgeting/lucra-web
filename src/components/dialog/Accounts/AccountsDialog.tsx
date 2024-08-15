import { FC, useState } from 'react';
import styled from 'styled-components';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { useAccounts } from '@/hooks/dashboard/useAccounts.hook';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { LinkPlaid, informParentCbStatus } from '@/components/bank/plaid/Link.Plaid';
import { Chevron } from '@/assets/chevron';
import { formatAsMoney } from '@/utils/formatAsMoney';
import colors from '@/assets/theme/colors';
import { Button } from '@/atoms/button/Button';
import { IBankAccount } from '@/types/models/bank/BankAccount';
import { ArrowIcon } from '@/assets/arrow-icon';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { AccountsHeader } from './AccountsHeader';
import { AccountItem } from './AccountItem';
import { AccountDetails } from './AccountDetails';

interface AccountsDialogProps extends DialogProps {}

const depositoryAccounts = ['checking', 'savings', 'investment'];
const debtAccounts = ['creditcard', 'loan'];

export type accountTypes = 'depository' | 'credit';

export const AccountsDialog: FC<AccountsDialogProps> = (props) => {
  const { isInTour } = dashboardSelector();
  const startOpen = !isInTour;
  const [containerRef] = useAutoAnimate();
  const [depositoryContainerRef] = useAutoAnimate();
  const [creditContainerRef] = useAutoAnimate();

  const [accountsCacheBuster, setAccountsCacheBuster] = useState<string>();
  const [accounts, isFetchingAccounts] = useAccounts(accountsCacheBuster);
  const [showDepository, setShowDepository] = useState<boolean>(startOpen);
  const [showCredit, setShowCredit] = useState<boolean>(startOpen);
  const [openAccount, setOpenAccount] = useState<IBankAccount | null>();

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

  function showAccountDetails(account: IBankAccount) {
    setOpenAccount(account);
  }

  function closeAccountDetails() {
    setOpenAccount(null);
  }

  return (
    <DialogContainer
      {...props}
      enableFooter={false}
      headerElement={
        openAccount ? (
          <Styles.BackArrow onClick={closeAccountDetails}>
            <ArrowIcon />
          </Styles.BackArrow>
        ) : (
          'Accounts'
        )
      }
    >
      <Styles.container ref={containerRef}>
        {openAccount ? (
          <AccountDetails account={openAccount} />
        ) : (
          <>
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
                            <AccountItem
                              key={i}
                              account={account}
                              type="depository"
                              onClick={showAccountDetails}
                            />
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
                            <AccountItem
                              key={i}
                              account={account}
                              type="credit"
                              onClick={showAccountDetails}
                            />
                          ))}
                        </Styles.accountListContainer>
                      )}
                    </Styles.accountTypeContainer>
                  </Styles.accountTypeListContainer>
                </>
              )}
            </Styles.accountListContainer>
            <Styles.footer>
              <LinkPlaid informParent={accountLinkStatusCb} isReadyCb={isReadyCb}>
                <Button disabled={!isPlaidReady} id="plaid_add_account_btn">
                  + Add account
                </Button>
              </LinkPlaid>
            </Styles.footer>
          </>
        )}
      </Styles.container>
    </DialogContainer>
  );
};

const Styles = {
  BackArrow: styled.span`
    cursor: pointer;
    border-radius: 8px;

    transition:
      padding 0.25s ease-in-out,
      background-color 0.25s ease-in-out;

    &:hover {
      padding: 8px 16px;
      background-color: ${colors.grey[200]};
    }
  `,
  container: styled.div`
    width: 100%;
    padding-bottom: 1rem;
    max-height: 70vh;
    display: flex;
    flex-direction: column;
    position: relative;
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
    margin-bottom: 1rem;

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
  footer: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding-top: 1rem;
    background-color: ${colors.white.main};
    position: sticky;
    bottom: 0;
    z-index: 10;
    padding: 1rem;
  `,
};
