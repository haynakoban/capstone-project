import {
  Avatar,
  Box,
  ClickAwayListener,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';

import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { Fragment, useState } from 'react';

const links = [
  {
    name: 'Resume',
    icon: <InsertDriveFileOutlinedIcon />,
  },
  {
    name: 'Log Out',
    icon: <LogoutOutlinedIcon />,
  },
];

const UserSettings = () => {
  const [open, setOpen] = useState(false);

  // click away listener
  const handleClick = () => setOpen((prev) => !prev);
  const handleClickAway = () => setOpen(false);

  return (
    <Fragment>
      <ClickAwayListener
        mouseEvent='onMouseDown'
        touchEvent='onTouchStart'
        onClickAway={handleClickAway}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            aria-label='settings'
            size='small'
            sx={{ outline: 'none', p: 0 }}
            onClick={handleClick}
          >
            <Avatar>C</Avatar>
          </IconButton>

          {/* handle the settings modal */}
          {open ? (
            <Box
              sx={{
                position: 'absolute',
                top: 44,
                right: 0,
                zIndex: 1,
                width: 250,
                boxShadow: 4,
                borderRadius: 1.5,
                p: 1,
                bgcolor: 'background.paper',
              }}
            >
              <Paper elevation={3}>
                <Typography
                  variant='h6'
                  component='div'
                  fontSize='16px!important'
                  fontWeight='700'
                  p={2}
                  textAlign='center'
                  sx={{ color: '#000', cursor: 'pointer' }}
                  onClick={() => console.log('clicked')}
                >
                  Jones Charles Ferdinand
                </Typography>
              </Paper>

              <List>
                {links.map((route) => (
                  <ListItem key={route?.name} disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ color: '#000000' }}>
                        {route?.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={route?.name}
                        sx={{ color: '#000000' }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>
    </Fragment>
  );
};
export default UserSettings;
