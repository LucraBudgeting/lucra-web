import { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { authRoutes } from '@/routes/RouteConstants';
import { AuthContainer } from '../AuthContainer';

interface ForgotPasswordProps {}

export const ForgotPasswordRequest: FC<ForgotPasswordProps> = ({}) => {
  const navigate = useNavigate();

  function redirectToLogin() {
    navigate(authRoutes.login);
  }
  return (
    <AuthContainer
      title="Forgot Password"
      subText="If a user with the email exists a password reset code will be delivered"
      cbText="Send Code"
      cb={() => {}}
      cbTabIndex={1}
      footer={<Styles.footer onClick={redirectToLogin}>Back To Login</Styles.footer>}
      isCbDisabled={false}
    >
      ForgotPassword
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
};
