import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LinkBank } from './components/LinkBank';

interface BankRoutesProps {}

export const BankRoutes: FC<BankRoutesProps> = ({}) => {
  return (
    <Routes>
      <Route path={'/'} element={<LinkBank />} />
    </Routes>
  );
};
