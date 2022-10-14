import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import ChatIcon from '@mui/icons-material/Chat';

import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AuthContext } from '../../../lib/authContext';
import { isUserLoggedIn } from '../../../features/users/usersSlice';

import Logo from './Logo';
import SideDrawer from './SideDrawer';
import UserSettings from '../../Settings/UserSettings';
import Notification from '../../Settings/Notification';

const NavigationBar = () => {
  const { _user, _isUserAuth } = useContext(AuthContext);
  const authRoute = [
    {
      name: 'Log In',
      path: '/login',
    },
    {
      name: 'Sign Up',
      path: '/signup',
    },
  ];
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [leftDrawer, showLeftDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [routes, setRoutes] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  // handle visible routes
  useEffect(() => {
    dispatch(isUserLoggedIn()).unwrap();
  }, [dispatch]);

  // Handle page title parsing.
  useEffect(() => {
    let title = pageTitle;
    if (pathname.includes('internship')) {
      title = 'Internship';
    } else if (pathname.includes('room')) {
      title = 'Room';
    } else if (pathname.includes('login')) {
      title = 'Log In';
    } else if (pathname.includes('signup')) {
      title = 'Sign Up';
    } else {
      title = 'Home';
    }
    document.title = `TrainNLearn | ${title}`;
    setPageTitle(title);
  }, [pageTitle, pathname]);

  // handle routes
  useEffect(() => {
    if (_user?._id) {
      if (_user?.internInfo) {
        setRoutes([
          {
            name: 'Internship',
            path: '/internship',
          },
          {
            name: 'Room',
            path: '/room',
          },
        ]);
      } else if (_user?.employeeInfo) {
        setRoutes([
          {
            name: 'Room',
            path: '/room',
          },
        ]);
      }
    }
  }, [_user?._id, _user?.internInfo, _user?.employeeInfo]);

  // handle notification load time
  useEffect(() => {
    if (_user?._id) {
      setIsLoading(true);
    }
  }, [_user?._id]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        elevation={1}
        position='fixed'
        sx={{
          bgcolor: '#FFFFFF',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display='flex' alignItems='center'>
            {/* menu */}
            <Box
              sx={{
                display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' },
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

            <Box
              sx={{
                display: { xs: 'block', sm: 'block', md: 'none' },
                color: '#000',
              }}
            >
              <Typography variant='h6' component='div'>
                {pageTitle}
              </Typography>
            </Box>

            <Box
              sx={{
                display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
                alignItems: 'center',
              }}
            >
              <Logo w={30} />
              <Typography
                variant='h6'
                fontWeight='semibold'
                sx={{ ml: 1, letterSpacing: 0.5, color: 'text.primary' }}
              >
                TrainNLearn
              </Typography>

              <Box ml={3}>
                <List sx={{ display: 'flex' }} disablePadding>
                  {routes.map((route) => (
                    <ListItem disablePadding key={route.name} sx={{}}>
                      <ListItemButton onClick={() => navigate(route.path)}>
                        <ListItemText
                          primary={route.name}
                          sx={{
                            color: '#000',
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Box>

          {/* will show if user logged in */}
          <Box display='flex' alignItems='center'>
            {!_isUserAuth ? (
              <Fragment>
                {/* if authorized dont show it */}
                <Box
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'none',
                      md: 'flex',
                    },
                    alignItems: {
                      xs: 'none',
                      sm: 'none',
                      md: 'center',
                    },
                  }}
                >
                  {authRoute.map((authroute) => (
                    <Button
                      key={authroute.name}
                      onClick={() => navigate(authroute.path)}
                      sx={{
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        fontSize: '1rem',
                      }}
                    >
                      {authroute.name}
                    </Button>
                  ))}
                </Box>
              </Fragment>
            ) : (
              <Fragment>
                {/* if authorized show this */}
                {/* chat icon*/}
                {/* <IconButton
                  sx={{ color: '#000000', bgcolor: '#00000015', mr: 1.5 }}
                  aria-label='message icon'
                >
                  <Badge color='error' badgeContent={0} max={99}>
                    <ChatIcon />
                  </Badge>
                </IconButton> */}

                {/* notification icon */}
                {isLoading && <Notification />}

                {/* user settings */}
                <UserSettings />
              </Fragment>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* show drawer */}
      <SideDrawer
        isUserAuthorize={_isUserAuth}
        routes={routes}
        authRoute={authRoute}
        showLeftDrawer={showLeftDrawer}
        leftDrawer={leftDrawer}
      />
    </Box>
  );
};
export default NavigationBar;
