import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseInput, Error } from '@/atoms/input/BaseInput';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { authRoutes, homeRoute } from '@/routes/RouteConstants';
import { ApiContext } from '@/stores/contexts/api.context';
import { setAuthentication } from '@/stores/slices/Authentication.slice';
import { useAppDispatch } from '@/stores/store.hooks';
import * as Styles from '../auth.styles';
import { validateEmail, validatePassword } from '../../validation';
import { AuthContainer } from '../AuthContainer';

interface RegisterV2Props {}

export const RegisterV2: FC<RegisterV2Props> = ({}) => {
  const navigate = useNavigate();
  const { authApi } = useContext(ApiContext);
  const dispatch = useAppDispatch();
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
  const [isRegisterDisabled, setIsRegisterDisabled] = useState<boolean>(true);

  function redirectToLogin() {
    navigate(authRoutes.login);
  }

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function onNameBlur() {
    const errors = [];

    if (!name) {
      errors.push('Name is required');
    }

    setNameErrors(errors);
    validateRegistrationForm();
  }

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function onEmailBlur() {
    const errors = validateEmail(email);
    setEmailErrors(errors);
    validateRegistrationForm();
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function onPasswordBlur() {
    const errors = validatePassword(password);
    setPasswordErrors(errors);
    validateRegistrationForm();
  }

  function onConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  function onConfirmPasswordBlur() {
    const errors = validatePassword(confirmPassword);

    if (password !== confirmPassword) {
      errors.push('Passwords do not match');
    }

    setConfirmPasswordErrors(errors);
    validateRegistrationForm();
  }

  function validateRegistrationForm() {
    setIsRegisterDisabled(
      !name ||
        !email ||
        !password ||
        !confirmPassword ||
        nameErrors.length > 0 ||
        emailErrors.length > 0 ||
        passwordErrors.length > 0 ||
        confirmPasswordErrors.length > 0
    );
  }

  function submitRegister() {
    if (isRegisterDisabled) {
      return;
    }

    setIsAuthorizing(true);
    authApi
      .login(email, password)
      .then((res) => {
        const { user, accessToken } = res;

        dispatch(
          setAuthentication({
            userId: user.userId,
            token: accessToken,
            phoneNumber: user.phoneNumber,
            email: user.email,
          })
        );

        setTimeout(() => {
          navigate(homeRoute);
        }, 50);
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
        <Styles.RegisterFooter tabIndex={5}>
          Already have an account? <p onClick={redirectToLogin}>Log in</p>
        </Styles.RegisterFooter>
      }
    >
      {isAuthorizing ? (
        <LoadingComponent loadingText="Logging in..." />
      ) : (
        <>
          <BaseInput
            label="Name*"
            tabIndex={1}
            value={name}
            onChange={onNameChange}
            onBlur={onNameBlur}
            errors={nameErrors}
            name="name"
          />
          <BaseInput
            label="Email*"
            tabIndex={2}
            value={email}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            errors={emailErrors}
            name="registration email"
          />
          <BaseInput
            label="Password*"
            issecret={true.toString()}
            tabIndex={3}
            value={password}
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
            errors={passwordErrors}
            name="registration password"
          />
          <BaseInput
            label="Confirm Password*"
            issecret={true.toString()}
            tabIndex={4}
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            onBlur={onConfirmPasswordBlur}
            errors={confirmPasswordErrors}
            name="confirm password"
          />
          {registrationError && <Error>{registrationError}</Error>}
        </>
      )}
    </AuthContainer>
  );
};
