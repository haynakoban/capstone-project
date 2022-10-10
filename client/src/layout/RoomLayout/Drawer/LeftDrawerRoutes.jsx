import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../lib/authContext';

import Logo from '../../MainLayout/Header/Logo';

const LeftDrawerRoutes = ({
  routes,
  leftDrawer,
  showLeftDrawer,
  path,
  active,
}) => {
  // Handles route navigation.
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);
  const [settings, setSettings] = useState([]);

  const { _user } = useContext(AuthContext);

  useEffect(() => {
    if (_user?._id) {
      const s = !_user?.isIntern && [
        {
          name: 'Description',
          path: '/description',
          icon: <DescriptionOutlinedIcon />,
        },
        {
          name: 'Settings',
          path: '/settings',
          icon: <SettingsOutlinedIcon />,
        },
      ];

      setSettings(s);
    }
  }, [_user?._id, _user?.isIntern]);

  return (
    <Drawer
      anchor='left'
      open={leftDrawer}
      onClose={() => showLeftDrawer(false)}
    >
      <Box
        width={240}
        height='100%'
        sx={{
          backgroundColor: '#363740',
        }}
      >
        <Toolbar
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Logo w={50} />
          <Typography
            variant='h5'
            fontWeight='normal'
            sx={{ mt: 1, letterSpacing: 0.5, color: '#FFFFFF95' }}
          >
            TrainNLearn
          </Typography>
        </Toolbar>

        <List>
          <ListItem>
            <ListItemText
              primary={
                <Fragment>
                  <Typography
                    textAlign='center'
                    variant='subtitle1'
                    fontWeight='bold'
                    textTransform='uppercase'
                    sx={{
                      px: 2,
                      mb: 1,
                      textAlign: 'center',
                      color: '#FFFFFF95',
                    }}
                  >
                    Join and Gain Work Experience
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>

          <Divider flexItem sx={{ bgcolor: '#FFFFFF50', height: 1.2 }} />

          {routes.map((route) => (
            <ListItem
              key={route?.name}
              disablePadding
              sx={{
                bgcolor: active({ path, route }),
                transition: 'all 400ms linear',
              }}
            >
              <ListItemButton
                onClick={() => {
                  navigate(`/room/${room_id}${route?.path}`);
                  showLeftDrawer(false);
                }}
              >
                <ListItemIcon sx={{ color: '#FFFFFF95' }}>
                  {route?.icon}
                </ListItemIcon>
                <ListItemText
                  primary={route?.name}
                  sx={{ color: '#FFFFFF95' }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          {settings?.length > 0 && (
            <Divider flexItem sx={{ bgcolor: '#FFFFFF50', height: 1.2 }} />
          )}

          {settings?.length > 0 &&
            settings?.map((route) => (
              <ListItem
                key={route?.name}
                disablePadding
                sx={{
                  bgcolor: active({ path, route }),
                  transition: 'all 400ms linear',
                }}
              >
                <ListItemButton
                  onClick={() => {
                    navigate(`/room/${room_id}${route?.path}`);
                    showLeftDrawer(false);
                  }}
                >
                  <ListItemIcon sx={{ color: '#FFFFFF95' }}>
                    {route?.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={route?.name}
                    sx={{ color: '#FFFFFF95' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
    </Drawer>
  );
};
export default LeftDrawerRoutes;
