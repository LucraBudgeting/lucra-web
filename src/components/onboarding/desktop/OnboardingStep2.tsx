import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { siteImageUrls } from '@/assets/site-image-urls';
import { Checkbox } from '@/assets/checkbox';
import { useAppDispatch } from '@/stores/store.hooks';
import { onboardingSelector, setPassword } from '@/stores/slices/Onboarding.slice';
import { styles } from './Styles';

interface OnboardingStep2Props {}

export const OnboardingStep2Left: FC<OnboardingStep2Props> = ({}) => {
  const [hasSymbol, setHasSymbol] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasLength, setHasLength] = useState(false);

  const dispatch = useAppDispatch();
  const { password } = onboardingSelector();

  useEffect(() => {
    validatePassword(password);
  }, []);

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));

    validatePassword(e.target.value);
  };

  const validatePassword = (password: string): boolean => {
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    const hasLength = password.length >= 8;

    setHasNumber(hasNumber);
    setHasSymbol(hasSymbol);
    setHasLength(hasLength);

    return hasNumber && hasSymbol && hasLength;
  };

  return (
    <Styled.left>
      <Styled.leftTextContainer>
        <h1>Create password</h1>
        <h3>
          Your password must be at least 8 characters long, and include one symbol and one number.
        </h3>
      </Styled.leftTextContainer>
      <Styled.leftInputContainer>
        <Styled.input label="Password" isSecret={true} onChange={updatePassword} value={password} />
        <Styled.passwordRequirements>
          <ul>
            <li>
              <Checkbox status={hasLength ? 'success' : ''} /> At least 8 characters long
            </li>
            <li>
              <Checkbox status={hasSymbol ? 'success' : ''} />
              At least 1 symbol
            </li>
            <li>
              <Checkbox status={hasNumber ? 'success' : ''} />
              At least 1 number
            </li>
          </ul>
        </Styled.passwordRequirements>
      </Styled.leftInputContainer>
    </Styled.left>
  );
};

export const OnboardingStep2Right: FC<OnboardingStep2Props> = ({}) => {
  return (
    <Styled.right>
      <Styled.rightImage src={siteImageUrls.onboarding_lock} />
    </Styled.right>
  );
};

const Styled = {
  ...styles,
  passwordRequirements: styled.div`
    li {
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `,
};
