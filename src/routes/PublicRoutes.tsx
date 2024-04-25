import { RouteObject } from 'react-router-dom';
import { lazyImport } from '@/utils/lazyImport';
import { authRoutes, healthBase } from './RouteConstants';
import { Redirect } from './redirect';
import { HealthRoutes } from './HealthRoutes';

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
    path: healthBase + '/*',
    element: <HealthRoutes />,
  },
  {
    path: '/*',
    element: <Redirect />,
  },
];
