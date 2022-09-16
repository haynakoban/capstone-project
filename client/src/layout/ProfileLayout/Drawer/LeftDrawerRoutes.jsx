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
import { useNavigate } from 'react-router-dom';

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
            sx={{ mt: 1, mb: 2, letterSpacing: 0.5, color: '#FFFFFF95' }}
          >
            TrainNLearn
          </Typography>
        </Toolbar>

        <List disablePadding>
          <Divider flexItem sx={{ bgcolor: '#FFFFFF50', height: 1.2, mb: 4 }} />

          {routes.map((route) => (
            <ListItem
              key={route?.name}
              disablePadding
              sx={{
                bgcolor: active({ pathname, route }),
                transition: 'all 400ms linear',
                '&:first-of-type': {
                  borderBottom: '1px solid #FFFFFF50',
                  mb: 0.5,
                },
              }}
            >
              <ListItemButton
                onClick={() => {
                  navigate(route?.path);
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
