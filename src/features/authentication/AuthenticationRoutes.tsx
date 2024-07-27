import { Navigate, Route } from 'react-router-dom';

import { AuthenticatedLayout } from '@/layouts/authentication/Authenticated.layout';
import { authRoutes } from '@/routes/RouteConstants';
import { CommitHash } from '@/utils/CommitHash';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { LoginV2 } from './components/login/LoginV2';
import { ForgotPasswordRequest } from './components/forgotPassword/ForgotPasswordRequest';
import { RegisterV2 } from './components/register/RegisterV2';

const isV2AuthEnabled = true;

export const AuthenticationRoutes = () => {
  return (
    <>
      <AuthenticatedLayout>
        {isV2AuthEnabled ? (
          <>
            <Route path={'login/forgot-password'} element={<ForgotPasswordRequest />} />
            <Route path={'login'} element={<LoginV2 />} />
            <Route path={'register'} element={<RegisterV2 />} />
          </>
        ) : (
          <>
            <Route path={'login'} element={<Login />} />
            <Route path={'register'} element={<Register />} />
          </>
        )}
        <Route path={'*'} element={<Navigate to={authRoutes.login} />} />
      </AuthenticatedLayout>
      <CommitHash />
    </>
  );
};
