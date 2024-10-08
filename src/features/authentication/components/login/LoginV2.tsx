import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { BaseInput, Error } from '@/atoms/input/BaseInput';
import { authRoutes, homeRoute } from '@/routes/RouteConstants';
import { ApiContext } from '@/stores/contexts/api.context';
import { useAppDispatch } from '@/stores/store.hooks';
import { setAuthentication } from '@/stores/slices/Authentication.slice';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import * as Styles from '../auth.styles';
import { AuthContainer } from '../AuthContainer';
import { validateEmail, validatePassword } from '../../validation';

interface LoginV2Props {}

export const LoginV2: FC<LoginV2Props> = ({}) => {
  const navigate = useNavigate();
  const { authApi } = useContext(ApiContext);
  const dispatch = useAppDispatch();
  const [parentRef] = useAutoAnimate();

  const [email, setEmail] = useState<string>('');
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  const isLoginDisabled =
    !email || !password || emailErrors.length > 0 || passwordErrors.length > 0;

  function redirectToRegister() {
    navigate(authRoutes.register);
  }
  function redirectToForgotPassword() {
    navigate(authRoutes.forgotPassword);
  }

  function validateEmailField(value: string) {
    const errors = validateEmail(value);
    setEmailErrors(errors);
  }

  function validatePasswordField(value: string) {
    const errors = validatePassword(value);
    setPasswordErrors(errors);
  }

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEmail(value);
    validateEmailField(value);
  }

  function onEmailBlur() {
    validateEmailField(email);
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPassword(value);
    validatePasswordField(value);
  }

  function onPasswordBlur() {
    validatePasswordField(password);
  }

  function submitLogin() {
    if (isLoginDisabled) {
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
            name: user.name,
          })
        );

        setTimeout(() => {
          navigate(homeRoute);
        }, 50);
      })
      .catch((res) => {
        setLoginError(res.message);
      })
      .finally(() => {
        setIsAuthorizing(false);
      });
  }

  return (
    <AuthContainer
      forwardRef={parentRef}
      title="Login to your account"
      subText="Welcome back! Please enter your details."
      cbText="Sign in"
      isCbDisabled={isLoginDisabled}
      cb={submitLogin}
      cbTabIndex={4}
      footer={
        <Styles.LoginFooter id="login-register-footer" onClick={redirectToRegister} tabIndex={5}>
          Register Here
        </Styles.LoginFooter>
      }
    >
      {isAuthorizing ? (
        <LoadingComponent loadingText="Logging in..." />
      ) : (
        <>
          <BaseInput
            label="Email*"
            tabIndex={1}
            value={email}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            $errors={emailErrors}
            name="login email"
            id="login-email"
          />
          <BaseInput
            label="Password*"
            $isSecret={true.toString()}
            tabIndex={2}
            value={password}
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
            $errors={passwordErrors}
            name="login password"
            id="login-password"
          />
          {loginError && <Error>{loginError}</Error>}
          <Styles.CtaContainer>
            <Styles.ForgotPassword onClick={redirectToForgotPassword} tabIndex={3}>
              Forgot Password?
            </Styles.ForgotPassword>
          </Styles.CtaContainer>
        </>
      )}
    </AuthContainer>
  );
};
