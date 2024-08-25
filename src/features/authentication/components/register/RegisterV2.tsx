import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseInput, Error } from '@/atoms/input/BaseInput';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { authRoutes, homeRoute } from '@/routes/RouteConstants';
import { ApiContext } from '@/stores/contexts/api.context';
import localStorageRepository from '@/utils/localStorage.repository';
import * as Styles from '../auth.styles';
import { validateEmail, validatePassword } from '../../validation';
import { AuthContainer } from '../AuthContainer';

interface RegisterV2Props {}

export const RegisterV2: FC<RegisterV2Props> = ({}) => {
  const navigate = useNavigate();
  const { onboardingApi } = useContext(ApiContext);
  const [parentRef] = useAutoAnimate();

  const [name, setName] = useState<string>('');
  const [nameErrors, setNameErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>('');
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState<string[]>([]);
  const [registrationError, setRegistrationError] = useState<string>('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  const isRegisterDisabled =
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    nameErrors.length > 0 ||
    emailErrors.length > 0 ||
    passwordErrors.length > 0 ||
    confirmPasswordErrors.length > 0;

  function redirectToLogin() {
    navigate(authRoutes.login);
  }

  function validateNameField(value: string) {
    const errors = [];
    if (!value) {
      errors.push('Name is required');
    }
    setNameErrors(errors);
  }

  function validateEmailField(value: string) {
    const errors = validateEmail(value);
    setEmailErrors(errors);
  }

  function validatePasswordField(value: string) {
    const errors = validatePassword(value);
    setPasswordErrors(errors);
  }

  function validateConfirmPasswordField(value: string) {
    const errors = validatePassword(value);
    if (password !== value) {
      errors.push('Passwords do not match');
    }
    setConfirmPasswordErrors(errors);
  }

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setName(value);
    validateNameField(value);
  }

  function onNameBlur() {
    validateNameField(name);
  }

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEmail(value);
    validateEmailField(value);
  }

  function onEmailBlur() {
    const errors = validateEmail(email);

    function blurActions(errorList: string[]) {
      setEmailErrors(errorList);
    }

    if (errors.length === 0) {
      onboardingApi
        .doesAccountWithEmailExist(email)
        .catch((res) => {
          errors.push(res.message);
        })
        .finally(() => {
          blurActions(errors);
        });
    } else {
      blurActions(errors);
    }
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPassword(value);
    validatePasswordField(value);
  }

  function onPasswordBlur() {
    validatePasswordField(password);
  }

  function onConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setConfirmPassword(value);
    validateConfirmPasswordField(value);
  }

  function onConfirmPasswordBlur() {
    validateConfirmPasswordField(confirmPassword);
  }

  function submitRegister() {
    if (isRegisterDisabled) {
      return;
    }

    setIsAuthorizing(true);

    onboardingApi
      .createAccount(email, name, password)
      .then((res) => {
        localStorageRepository.setUserToken(res.token);

        if (res.checkoutUrl) {
          location.href = res.checkoutUrl;
        } else {
          navigate(homeRoute);
        }
      })
      .catch((res) => {
        setRegistrationError(res.message);
      })
      .finally(() => {
        setIsAuthorizing(false);
      });
  }

  return (
    <AuthContainer
      forwardRef={parentRef}
      title="Sign up"
      subText="Start your 30-day free trial"
      cbText="Get started"
      isCbDisabled={isRegisterDisabled}
      cb={submitRegister}
      cbTabIndex={5}
      footer={
        <Styles.RegisterFooter tabIndex={5} id="login-register-footer">
          Already have an account?{' '}
          <p onClick={redirectToLogin} id="login-register-back-to-login-btn">
            Log in
          </p>
        </Styles.RegisterFooter>
      }
    >
      {isAuthorizing ? (
        <LoadingComponent loadingText="Creating account..." />
      ) : (
        <>
          <BaseInput
            label="Name*"
            tabIndex={1}
            value={name}
            onChange={onNameChange}
            onBlur={onNameBlur}
            $errors={nameErrors}
            name="name"
            id="registration-full-name"
          />
          <BaseInput
            label="Email*"
            tabIndex={2}
            value={email}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            $errors={emailErrors}
            name="registration email"
            id="registration-email"
          />
          <BaseInput
            label="Password*"
            $isSecret={true.toString()}
            tabIndex={3}
            value={password}
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
            $errors={passwordErrors}
            name="registration password"
            id="registration-password"
          />
          <BaseInput
            label="Confirm Password*"
            $isSecret={true.toString()}
            tabIndex={4}
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            onBlur={onConfirmPasswordBlur}
            $errors={confirmPasswordErrors}
            name="confirm password"
            id="registration-confirm-password"
          />
          {registrationError && <Error>{registrationError}</Error>}
        </>
      )}
    </AuthContainer>
  );
};
