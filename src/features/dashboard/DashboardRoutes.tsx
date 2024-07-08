import { FC, useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/dashboard/DashboardLayout';
import { dashboardRoutes } from '@/routes/RouteConstants';
import { DashboardPage } from './pages/DashboardPage';
import { envHelper } from '@/utils/env.helper';

interface DashboardRoutesProps {}

export const DashboardRoutes: FC<DashboardRoutesProps> = ({}) => {
  useEffect(() => {
    const isProd = envHelper.isProd;
    const docTitle = 'Lucra Dashboard';
    if (isProd) {
      document.title = docTitle;
    } else {
      document.title = `${envHelper.currentEnv} - ${docTitle}`;
    }
  }, []);

  return (
    <DashboardLayout>
      <Route path={'/'} element={<DashboardPage />} />
      <Route path={'*'} element={<Navigate to={'/' + dashboardRoutes.base} />} />
    </DashboardLayout>
  );
};
