import { RouteObject } from 'react-router-dom';
import { lazyImport } from '@/utils/lazyImport';
import { authRoutes, bankRoutes, healthBase } from './RouteConstants';
import { Redirect } from './redirect';
import { HealthRoutes } from './HealthRoutes';
import { BankRoutes } from '@/features/bank/BankRoutes';

const { AuthenticationRoutes } = lazyImport(
  () => import('@/features/authentication/AuthenticationRoutes'),
  'AuthenticationRoutes'
);

export const PublicRoutes: RouteObject[] = [
  {
    path: `/${authRoutes.base}/*`,
    element: <AuthenticationRoutes />,
  },
  {
    path: `/${healthBase}/*`,
    element: <HealthRoutes />,
  },
  {
    path: `/${bankRoutes.base}/*`,
    element: <BankRoutes />,
  },
  {
    path: '/*',
    element: <Redirect />,
  },
];
