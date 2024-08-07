import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { homeRoute } from '@/routes/RouteConstants';
import { useAuth } from '@/hooks/authentication/useAuth.hook';
import { ApiContext } from '@/stores/contexts/api.context';
import * as Styled from './Styles';

interface coreNavbarProps {}

export const CoreAppbar: FC<coreNavbarProps> = ({}) => {
  const { billingApi } = useContext(ApiContext);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  const gotoBilling = async () => {
    const billingUrl = await billingApi.getBillingUrl('');
    location.href = billingUrl;
  };

  const navigateToHome = () => {
    navigate(homeRoute);
  };

  return (
    <Styled.CoreLayoutAppbar data-cy="core-app-bar">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ maxHeight: '40px' }}>
            <Styled.Row onClick={navigateToHome} sx={{ cursor: 'pointer' }}>
              <AdbIcon />
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Home
              </Typography>
            </Styled.Row>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="billing" onClick={gotoBilling}>
                  <Typography textAlign="center">Manage Billing</Typography>
                </MenuItem>
                <MenuItem key="logout" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Styled.CoreLayoutAppbar>
  );
};
