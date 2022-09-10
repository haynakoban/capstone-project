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
import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Logo from '../../MainLayout/Header/Logo';

const LeftDrawerRoutes = ({
  routes,
  leftDrawer,
  showLeftDrawer,
  pathname,
  active,
}) => {
  // Handles route navigation.
  const navigate = useNavigate();
  const { id } = useParams();

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
                bgcolor: active({ pathname, route }),
                transition: 'all 400ms linear',
              }}
            >
              <ListItemButton
                onClick={() => {
                  navigate(`/room/${id}${route?.path}`);
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
