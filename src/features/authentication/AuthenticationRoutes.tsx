import { Navigate, Route } from 'react-router-dom';

import { AuthenticatedLayout } from '@/layouts/authentication/Authenticated.layout';
import { authRoutes } from '@/routes/RouteConstants';
import { CommitHash } from '@/utils/CommitHash';
import { LoginV2 } from './components/login/LoginV2';
import { ForgotPasswordRequest } from './components/forgotPassword/ForgotPasswordRequest';
import { RegisterV2 } from './components/register/RegisterV2';

export const AuthenticationRoutes = () => {
  return (
    <>
      <AuthenticatedLayout>
        <Route path={'login/forgot-password'} element={<ForgotPasswordRequest />} />
        <Route path={'login'} element={<LoginV2 />} />
        <Route path={'register'} element={<RegisterV2 />} />
        <Route path={'*'} element={<Navigate to={authRoutes.login} />} />
      </AuthenticatedLayout>
      <CommitHash />
    </>
  );
};
