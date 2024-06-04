import { FC, useContext, useState } from 'react';
import styled from 'styled-components';
import { siteImageUrls } from '@/assets/site-image-urls';
import { LinkPlaid } from '@/components/bank/plaid/Link.Plaid';
import { ApiContext } from '@/apis/api.context';
import { styles } from './Styles';
import { useDispatch } from 'react-redux';
import { addAccounts, onboardingSelector } from '@/stores/slices/Onboarding.slice';
import { BankAccountItem } from '@/atoms/bank/BankAccountItem';

interface OnboardingStep4Props {}

export const OnboardingStep4Left: FC<OnboardingStep4Props> = ({}) => {
  const dispatch = useDispatch();
  const { bankAccounts } = onboardingSelector();
  const { bankApi, onboardingApi } = useContext(ApiContext);
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function getAccounts() {
    bankApi.getBankAccounts().then((response) => {
      dispatch(addAccounts(response.bankAccounts));
    });
  }

  const onLinkCb = async (status: 'success' | 'error', msg?: string) => {
    if (status === 'error') {
      setErrorMsg(msg || '');
      return;
    }

    await getAccounts();
  };

  const onBankSuccessCb = async (publicToken: string) => {
    await onboardingApi
      .syncAccount(publicToken)
      .then(() => {
        onLinkCb('success');
      })
      .catch((err) => {
        onLinkCb('error', err);
      });
  };

  return (
    <Styled.left>
      <Styled.leftTextContainer>
        <h1>Connect your accounts</h1>
        <h3>Lucra uses Plaid to securely connect all of your bank and investment accounts.</h3>
      </Styled.leftTextContainer>
      <LinkPlaid onSuccess={onBankSuccessCb}>
        {bankAccounts.length ? '+ Add Another Account' : 'Connect Your Account'}
      </LinkPlaid>
      <p>{errorMsg}</p>
      <button onClick={() => onLinkCb('success')}>TEST</button>
    </Styled.left>
  );
};

export const OnboardingStep4Right: FC<OnboardingStep4Props> = ({}) => {
  const { bankAccounts } = onboardingSelector();
  return (
    <Styled.right>
      <Styled.rightContainer>
        <Styled.rightHeaderText>Your accounts</Styled.rightHeaderText>
        {!bankAccounts.length ? (
          <Styled.imgContainer>
            <Styled.rightImage src={siteImageUrls.logo_secondary} />
          </Styled.imgContainer>
        ) : (
          bankAccounts.map((account) => {
            return <BankAccountItem key={account.id} account={account} />;
          })
        )}
      </Styled.rightContainer>
    </Styled.right>
  );
};

const Styled = {
  ...styles,
  rightContainer: styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    padding: 40px;
    background: #fff;
    box-shadow: 0px 2px 8px -1px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    gap: 20px;
    padding-bottom: 4px;
  `,
  imgContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    height: 100%;
  `,
  rightHeaderText: styled.h1`
    font-size: 28px;
    font-weight: 700;
    line-height: 34px;
  `,
};
