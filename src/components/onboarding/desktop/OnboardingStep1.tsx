import { FC, useContext, useState } from 'react';
import { siteImageUrls } from '@/assets/site-image-urls';
import { useAppDispatch } from '@/stores/store.hooks';
import { onboardingSelector, setEmail, setFullName } from '@/stores/slices/Onboarding.slice';
import { isValidEmail } from '@/utils/isValidEmail';
import { styles } from './Styles';
import { ApiContext } from '@/apis/api.context';

interface OnboardingStep1Props {}

export const OnboardingStep1Left: FC<OnboardingStep1Props> = ({}) => {
  const apis = useContext(ApiContext);

  const [fullNameErrors, setFullNameErrors] = useState<string | undefined>();
  const [emailErrors, setEmailErrors] = useState<string | undefined>();

  const dispatch = useAppDispatch();
  const { fullName, email } = onboardingSelector();

  const updateFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFullName(e.target.value));
  };
  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const validateFullName = () => {
    if (!fullName) {
      setFullNameErrors('Full name is required');
    } else {
      setFullNameErrors('');
    }
  };

  const validateEmail = () => {
    if (!email) {
      setEmailErrors('Email is required');
    } else if (!isValidEmail(email)) {
      setEmailErrors('Email format is invalid');
    } else {
      setEmailErrors('');
      apis.onboardingApi.doesAccountWithEmailExist(email).catch((res) => {
        setEmailErrors(res?.content?.message);
      });
    }
  };

  return (
    <Styled.left>
      <Styled.leftTextContainer>
        <h1>Create your account</h1>
        <h3>
          Set up your account to get started. This helps us keep your financial information safe and
          secure.
        </h3>
      </Styled.leftTextContainer>
      <Styled.leftInputContainer>
        <Styled.input
          onChange={updateFullName}
          onBlur={validateFullName}
          value={fullName}
          error={fullNameErrors}
          label="Full name"
        />
        <Styled.input
          onChange={updateEmail}
          onBlur={validateEmail}
          value={email}
          error={emailErrors}
          label="Email address"
        />
      </Styled.leftInputContainer>
    </Styled.left>
  );
};

export const OnboardingStep1Right: FC<OnboardingStep1Props> = ({}) => {
  return (
    <Styled.right>
      <Styled.rightImage src={siteImageUrls.onboarding_boy} />
    </Styled.right>
  );
};

const Styled = {
  ...styles,
};
