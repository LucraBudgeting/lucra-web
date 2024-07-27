import { FC, useContext, useState } from 'react';
import { AuthContainer } from '../AuthContainer';
import styled from 'styled-components';
import { BaseInput, Error } from '@/atoms/input/BaseInput';
import { useNavigate } from 'react-router-dom';
import { authRoutes, homeRoute } from '@/routes/RouteConstants';
import { isValidEmail } from '@/utils/isValidEmail';
import { ApiContext } from '@/stores/contexts/api.context';
import { useAppDispatch } from '@/stores/store.hooks';
import { setAuthentication } from '@/stores/slices/Authentication.slice';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { useAutoAnimate } from '@formkit/auto-animate/react';

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
  const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(true);

  function redirectToRegister() {
    navigate(authRoutes.register);
  }
  function redirectToForgotPassword() {
    navigate(authRoutes.forgotPassword);
  }

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function onEmailBlur() {
    const errors = validateEmail(email);
    setEmailErrors(errors);
    validateLoginForm();
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function onPasswordBlur() {
    const errors = validatePassword(password);
    setPasswordErrors(errors);
    validateLoginForm();
  }

  function validateLoginForm() {
    setIsLoginDisabled(!email || !password || emailErrors.length > 0 || passwordErrors.length > 0);
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
        <Styles.footer onClick={redirectToRegister} tabIndex={5}>
          Register Here
        </Styles.footer>
      }
    >
      {isAuthorizing ? (
        <LoadingComponent loadingText="Logging in..." />
      ) : (
        <>
          <BaseInput
            label="Email"
            tabIndex={1}
            value={email}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            errors={emailErrors}
            name="email"
          />
          <BaseInput
            label="Password"
            issecret={true.toString()}
            tabIndex={2}
            value={password}
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
            errors={passwordErrors}
            name="password"
          />
          {loginError && <Error>{loginError}</Error>}
          <Styles.ctaContainer>
            <Styles.forgotPassword onClick={redirectToForgotPassword} tabIndex={3}>
              Forgot Password?
            </Styles.forgotPassword>
          </Styles.ctaContainer>
        </>
      )}
    </AuthContainer>
  );
};

const Styles = {
  footer: styled.p`
    color: #333;
    font-size: 14px;
    margin-top: 0.5rem;
    cursor: pointer;
    text-decoration: underline;
  `,
  ctaContainer: styled.div``,
  forgotPassword: styled.p`
    color: #136df4;
    font-size: 12px;
    cursor: pointer;
    font-weight: 600;
  `,
};

function validatePassword(password: string): string[] {
  const errors = [];
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);
  const hasLength = password.length >= 8;

  if (!password) {
    errors.push('Password is required');
  }

  if (!hasNumber) {
    errors.push('Password must contain at least one number');
  }

  if (!hasSymbol) {
    errors.push('Password must contain at least one symbol');
  }

  if (!hasLength) {
    errors.push('Password must be at least 8 characters long');
  }

  return errors;
}

function validateEmail(email: string): string[] {
  const errors = [];
  if (!email) {
    errors.push('Email is required');
  }

  if (!isValidEmail(email)) {
    errors.push('Email is invalid');
  }

  return errors;
}
