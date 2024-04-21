import {  RouteObject } from 'react-router-dom';
import { lazyImport } from '@/utils/lazyImport';
import { authRoutes } from './RouteConstants';
import { Redirect } from './redirect';

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
    path: '/*',
    element: <Redirect />,
  },
];
