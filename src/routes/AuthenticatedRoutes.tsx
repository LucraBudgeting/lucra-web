import { RouteObject } from 'react-router-dom';

import { AuthCheckProvider } from '@/providers/AuthProviders';
import { DashboardRoutes } from '@/features/dashboard/DashboardRoutes';
import { dashboardRoutes } from './RouteConstants';
import { Redirect } from './redirect';
export const AuthenticatedRoutes: RouteObject[] = [
  {
    path: '/*',
    element: <AuthCheckProvider />,
    children: [
      {
        path: dashboardRoutes.base + '/*',
        element: <DashboardRoutes />,
      },
      {
        path: '/*',
        element: <Redirect />,
      },
    ],
  },
];
