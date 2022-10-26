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

import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserInfo,
  getUserId,
  getUserInfo,
  resetState,
  userLogout,
} from '../../features/users/usersSlice';
import avatarTheme from '../../lib/avatar';
import {
  dailyAttendance,
  outTimeDailyAttendance,
} from '../../features/attendances/attendancesSlice';

const UserSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const userId = useSelector(getUserId);
  const user = useSelector(getUserInfo);
  const daily_attendance = useSelector(dailyAttendance);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserInfo(userId)).unwrap();
    }
  }, [dispatch, userId]);

  // click away listener
  const handleClick = () => setOpen((prev) => !prev);
  const handleClickAway = () => setOpen(false);

  // handle logout button
  const onUserLogout = () => {
    dispatch(userLogout());

    // if user is intern, create out time
    // otherwise ignore this line of code
    if (user?.internInfo?.companyInfo?.hasCompany) {
      const date = new Date();

      if (date.getDay() !== 0) {
        if (daily_attendance?._id) {
          dispatch(
            outTimeDailyAttendance({
              id: daily_attendance?._id,
              attendance_date: daily_attendance?.attendance_date,
              out_time: date,
            })
          );
        }
      }
    }

    if (pathname === '/') {
      resetState();
      window.location.reload(true);
    } else {
      navigate('/');
      resetState();
      window.location.reload(true);
    }
  };

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
            <Avatar
              sx={{
                bgcolor: avatarTheme({
                  name: user?.name?.[0]?.toLowerCase(),
                }),
              }}
            >
              {user && user?.name?.[0]?.toUpperCase()}
            </Avatar>
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
                  onClick={() => navigate(`/settings/account`)}
                >
                  {user && user?.name}
                </Typography>
              </Paper>

              <List>
                {user?.isIntern && (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => navigate(`/settings/resume`)}
                    >
                      <ListItemIcon sx={{ color: '#000000' }}>
                        <InsertDriveFileOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary='Resume'
                        sx={{ color: '#000000' }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
                <ListItem disablePadding>
                  <ListItemButton onClick={onUserLogout}>
                    <ListItemIcon sx={{ color: '#000000' }}>
                      <LogoutOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary='Log Out' sx={{ color: '#000000' }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>
    </Fragment>
  );
};
export default UserSettings;
