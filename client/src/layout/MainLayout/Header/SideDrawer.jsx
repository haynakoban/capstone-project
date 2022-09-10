import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from './Logo';

const SideDrawer = ({
  routes,
  authRoute,
  showLeftDrawer,
  leftDrawer,
  isUserAuthorize,
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
                    fontWeight='400'
                    letterSpacing={1}
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
              disablePadding
              key={route?.name}
              sx={{
                transition: 'all 400ms linear',
              }}
            >
              <ListItemButton
                onClick={() => {
                  navigate(route?.path);
                  showLeftDrawer(false);
                }}
              >
                <ListItemText
                  primary={route?.name}
                  sx={{
                    color: '#FFFFFF95',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          {/* show it not authorize */}
          {!isUserAuthorize &&
            authRoute.map((route) => (
              <ListItem
                disablePadding
                key={route?.name}
                sx={{
                  transition: 'all 400ms linear',
                }}
              >
                <ListItemButton
                  onClick={() => {
                    navigate(route?.path);
                    showLeftDrawer(false);
                  }}
                >
                  <ListItemText
                    primary={route?.name}
                    sx={{
                      color: '#FFFFFF95',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
    </Drawer>
  );
};
export default SideDrawer;
