import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  IconButton,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../lib/authContext';
import avatarTheme from '../../lib/avatar';
import {
  getNotifications,
  getReadNotifs,
  newNotification,
  readNotification,
  selectAllNotification,
} from '../../features/notifications/notificationsSlice';
import TimeAgo from '../../components/global/TimeAgo';

const Notification = () => {
  const { _user, socket } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listOfNotification = useSelector(getNotifications);
  const isNotifRead = useSelector(getReadNotifs);

  // click away listener
  const handleClick = () => {
    setOpen((prev) => !prev);
    setNotifCount(0);
  };
  const handleClickAway = () => setOpen(false);

  useEffect(() => {
    if (_user?._id) {
      dispatch(selectAllNotification(_user?._id));
    }
  }, [_user?._id, dispatch]);

  useEffect(() => {
    if (socket.current) {
      socket.current?.on('receive_notif', (data) => {
        dispatch(newNotification(data));
        setNotifCount((prev) => prev + 1);
      });
    }
  }, [socket, dispatch]);

  useEffect(() => {
    if (isNotifRead) {
      setNotifCount(isNotifRead);
    }
  }, [isNotifRead]);

  return (
    <Fragment>
      <ClickAwayListener
        mouseEvent='onMouseDown'
        touchEvent='onTouchStart'
        onClickAway={handleClickAway}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            sx={{ color: '#00000090', bgcolor: '#00000015', mr: 1.5 }}
            aria-label='notif icon'
            onClick={handleClick}
          >
            <Badge color='error' badgeContent={notifCount ?? 0} max={99}>
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {open ? (
            <Box
              className='comment'
              sx={{
                position: 'absolute',
                top: 42,
                right: -20,
                maxHeight: 'calc(100vh - 200px)',
                zIndex: 1,
                width: 320,
                boxShadow: 10,
                borderRadius: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                p: 1,
                bgcolor: 'background.paper',
                color: '#000',
              }}
            >
              <Typography variant='h5' fontWeight={600} p={1}>
                Notifications
              </Typography>

              {/* loop the notif here */}
              {listOfNotification?.length > 0 &&
                listOfNotification?.map((notif) => (
                  <Box
                    key={notif._id}
                    display='flex'
                    alignItems='center'
                    height={70}
                    maxHeight={70}
                    sx={{
                      px: 1,
                      cursor: 'pointer',
                      ...(notif?.recipient
                        ? { bgcolor: '#f2f2f2' }
                        : { bgcolor: '#fff' }),
                      '&:hover': {
                        bgcolor: '#f2f2f2',
                        borderRadius: 2,
                      },
                    }}
                    onClick={() => {
                      if (notif?.recipient) {
                        dispatch(
                          readNotification({
                            id: notif?._id,
                            user_id: _user?._id,
                          })
                        );
                      }
                      handleClick();
                      navigate(
                        `/room/${notif?.company_id}/tasks/${notif?.task_id}`
                      );
                    }}
                  >
                    <Avatar
                      sx={{
                        mr: 1,
                        bgcolor: avatarTheme({
                          name: notif?.name?.[0]?.toLowerCase(),
                        }),
                      }}
                    >
                      {notif?.name?.[0]}
                    </Avatar>
                    <Box
                      mt={1}
                      display='flex'
                      flexDirection='column'
                      // flexGrow={1}
                    >
                      <Typography
                        variant='body2'
                        fontWeight={700}
                        height={20}
                        maxHeight={20}
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          ...(notif?.recipient
                            ? { width: 220 }
                            : { width: 240 }),
                          ...(notif?.recipient
                            ? { maxWidth: 220 }
                            : { maxWidth: 240 }),
                        }}
                      >
                        {notif?.name} created a task
                      </Typography>

                      <Typography
                        variant='body2'
                        fontWeight={500}
                        height={20}
                        maxHeight={20}
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          ...(notif?.recipient
                            ? { width: 220 }
                            : { width: 240 }),
                          ...(notif?.recipient
                            ? { maxWidth: 220 }
                            : { maxWidth: 240 }),
                        }}
                      >
                        {notif?.title}
                      </Typography>
                      {notif?.recipient ? (
                        <TimeAgo
                          timestamp={notif?.createdAt}
                          color='primary.main'
                        />
                      ) : (
                        <TimeAgo timestamp={notif?.createdAt} />
                      )}
                    </Box>
                    {notif?.recipient ? (
                      <FiberManualRecordIcon fontSize='small' color='primary' />
                    ) : null}
                  </Box>
                ))}
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>
    </Fragment>
  );
};
export default Notification;
