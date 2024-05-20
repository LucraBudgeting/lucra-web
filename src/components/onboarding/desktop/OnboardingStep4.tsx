import { FC, useContext, useState } from 'react';
import styled from 'styled-components';
import { siteImageUrls } from '@/assets/site-image-urls';
import { LinkPlaid } from '@/components/bank/plaid/Link.Plaid';
import { ApiContext } from '@/apis/api.context';
import { styles } from './Styles';

interface OnboardingStep4Props {}

export const OnboardingStep4Left: FC<OnboardingStep4Props> = ({}) => {
  const { bankApi } = useContext(ApiContext);
  const [accounts, setAccounts] = useState<any[]>([]);

  const onPliadLinkCb = (status: 'success' | 'error') => {
    console.log('Plaid link status:', status);
    bankApi.getBankAccounts().then((response) => {
      console.log('Bank accounts:', response);
      setAccounts(response.bankAccounts);
    });
  };

  return (
    <Styled.left>
      <Styled.leftTextContainer>
        <h1>Connect your accounts</h1>
        <h3>Lucra uses Plaid to securely connect all of your bank and investment accounts.</h3>
      </Styled.leftTextContainer>
      <LinkPlaid informParent={onPliadLinkCb}>Connect Your Account</LinkPlaid>
      <button onClick={() => onPliadLinkCb('success')}>TEST</button>
      {accounts.map((account) => {
        return <div key={account.id}>{account.institutionDisplayName}</div>;
      })}
    </Styled.left>
  );
};

export const OnboardingStep4Right: FC<OnboardingStep4Props> = ({}) => {
  return (
    <Styled.right>
      <Styled.rightContainer>
        <Styled.rightHeaderText>Your accounts</Styled.rightHeaderText>
        <Styled.imgContainer>
          <Styled.rightImage src={siteImageUrls.logo_secondary} />
        </Styled.imgContainer>
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
  `,
  imgContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
  `,
  rightHeaderText: styled.h1`
    font-size: 28px;
    font-weight: 700;
    line-height: 34px;
  `,
};
