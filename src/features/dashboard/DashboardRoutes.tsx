import { DashboardLayout } from '@/layouts/dashboard/DashboardLayout';
import { dashboardRoutes } from '@/routes/RouteConstants';
import { FC, useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';

interface DashboardRoutesProps {}

export const DashboardRoutes: FC<DashboardRoutesProps> = ({}) => {
  useEffect(() => {
    document.title = 'Lucra Dashboard';
  }, []);

  return (
    <DashboardLayout>
      <Route path={'/'} element={<DashboardPage />} />
      <Route path={'*'} element={<Navigate to={'/' + dashboardRoutes.base} />} />
    </DashboardLayout>
  );
};
