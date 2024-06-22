import { FC } from 'react';
import { Routes } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return <Routes>{children}</Routes>;
};
