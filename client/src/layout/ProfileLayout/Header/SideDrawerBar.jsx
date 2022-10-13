import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import ChatIcon from '@mui/icons-material/Chat';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import LeftDrawerRoutes from '../Drawer/LeftDrawerRoutes';
import PermanentDrawer from '../Drawer/PermanentDrawer';
import SettingsModal from '../../Settings/UserSettings';
import Notification from '../../Settings/Notification';

const drawerWidth = 240;

const SideDrawerBar = ({ routes, content }) => {
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [leftDrawer, showLeftDrawer] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  const toggleLeftDrawer = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    showLeftDrawer(!leftDrawer);
  };

  const active = ({ pathname, route }) => {
    if (pathname === route?.path) return '#DDE2FF50';
  };

  // Handle page title parsing.
  useEffect(() => {
    let title = pageTitle;
    if (pathname.includes('account')) {
      title = 'General';
    } else if (pathname.includes('resume')) {
      title = 'Resume';
    } else if (pathname.includes('invitation')) {
      title = 'Invitation';
    } else if (pathname.includes('request')) {
      title = 'Request';
    } else {
      title = '404';
    }
    document.title = `Settings | ${title}`;
    setPageTitle(title);
  }, [pageTitle, pathname]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        elevation={1}
        position='fixed'
        sx={{
          width: {
            xs: '100%',
            sm: '100%',
            md: '100%',
            lg: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            xs: '0',
            sm: '0',
            md: '0',
            lg: `${drawerWidth}px`,
          },
          bgcolor: '#FFFFFF',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display='flex' alignItems='center'>
            {/* menu for links */}
            <Box
              sx={{
                display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
                mr: 1,
              }}
            >
              <IconButton
                sx={{
                  color: '#00000090',
                }}
                onClick={toggleLeftDrawer}
                edge='start'
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Typography
              variant='h6'
              noWrap
              component='div'
              color='text.primary'
            >
              {pageTitle}
            </Typography>
          </Box>

          <Box display='flex' alignItems='center'>
            {/* chat icon */}
            {/* <IconButton
              sx={{ color: '#000000', bgcolor: '#00000015', mr: 1.5 }}
              aria-label='message icon'
            >
              <Badge color='error' badgeContent={0} max={99}>
                <ChatIcon />
              </Badge>
            </IconButton> */}

            {/* notification icon */}
            <Notification />

            {/* user icon */}
            {/* settings modal for small screen - user */}
            <SettingsModal />
          </Box>
        </Toolbar>
      </AppBar>

      {/* permanent drawer for large screen - routes */}
      <PermanentDrawer routes={routes} active={active} pathname={pathname} />

      {/* temporary left drawer for medium to small screen - routes */}
      <LeftDrawerRoutes
        routes={routes}
        active={active}
        pathname={pathname}
        showLeftDrawer={showLeftDrawer}
        leftDrawer={leftDrawer}
      />

      {/* content */}
      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: '#f2f2f2', p: 3, color: '#000' }}
      >
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
};

export default SideDrawerBar;
