import { RouteObject } from 'react-router-dom';
import { lazyImport } from '@/utils/lazyImport';

import { AuthCheckProvider } from '@/providers/AuthProviders';
import { dashboardRoutes, pokemonRoutes } from './RouteConstants';
import { Redirect } from './redirect';
import { DashboardRoutes } from '@/features/dashboard/DashboardRoutes';
const { PokemonRoutes } = lazyImport(
  () => import('@/features/pokemon/PokemonRoutes'),
  'PokemonRoutes'
);

export const AuthenticatedRoutes: RouteObject[] = [
  {
    path: '/*',
    element: <AuthCheckProvider />,
    children: [
      {
        path: pokemonRoutes.base + '/*',
        element: <PokemonRoutes />,
      },
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
