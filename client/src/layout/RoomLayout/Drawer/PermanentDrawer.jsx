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
import { useNavigate, useParams } from 'react-router-dom';

import Logo from '../../MainLayout/Header/Logo';

const drawerWidth = 240;

const PermanentDrawer = ({ routes, active, pathname }) => {
  // Handles route navigation.
  const navigate = useNavigate();
  const { id } = useParams();

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

        <Divider />

        <List>
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
                onClick={() => navigate(`/room/${id}${route?.path}`)}
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
export default PermanentDrawer;
