import { FC } from 'react';
import { Routes } from 'react-router-dom';
import styled from 'styled-components';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export const AuthenticatedLayout: FC<AuthenticatedLayoutProps> = ({ children }) => {
  return (
    <Styled.AuthOutletContainer>
      <Routes>{children}</Routes>
    </Styled.AuthOutletContainer>
  );
};

const Styled = {
  AuthOutletContainer: styled.div`
    width: 100vw;
  `,
};
