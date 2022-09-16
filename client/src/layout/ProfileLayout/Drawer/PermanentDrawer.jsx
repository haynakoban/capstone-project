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

const drawerWidth = 240;

const PermanentDrawer = ({ routes, active, pathname }) => {
  // Handles route navigation.
  const navigate = useNavigate();

  return (
    <Drawer
      sx={{
        display: {
          xs: 'none',
          sm: 'none',
          md: 'none',
          lg: 'block',
        },
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='permanent'
      anchor='left'
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box
        width='100%'
        height='100vh'
        sx={{
          backgroundColor: '#363740',
        }}
      >
        <Toolbar>
          <Logo w={30} />
          <Typography
            variant='h6'
            fontWeight='semibold'
            sx={{ ml: 1, letterSpacing: 0.5, color: '#FFFFFF95' }}
          >
            TrainNLearn
          </Typography>
        </Toolbar>

        <Divider sx={{ bgcolor: '#FFFFFF50', mb: 4 }} />

        <List disablePadding>
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
              <ListItemButton onClick={() => navigate(route?.path)}>
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
export default PermanentDrawer;
