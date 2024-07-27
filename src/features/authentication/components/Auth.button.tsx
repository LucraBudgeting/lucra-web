import { FC } from 'react';
import { Button, styled } from '@mui/material';

interface LoginButtonProps {
  onClick: () => void;
  text: string;
}

export const AuthButton: FC<LoginButtonProps> = ({ onClick, text }) => {
  return <LoginButton onClick={onClick}>{text}</LoginButton>;
};

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.typography.button.color,
  textAlign: 'center',
  cursor: 'pointer',
  textDecoration: 'none',
}));
