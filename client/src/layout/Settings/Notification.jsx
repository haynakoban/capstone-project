import {
  Avatar,
  Badge,
  Box,
  //   Button,
  ClickAwayListener,
  IconButton,
  Typography,
  //   Modal,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../lib/authContext';
import avatarTheme from '../../lib/avatar';
import {
  getNotifications,
  selectAllNotification,
} from '../../features/notifications/notificationsSlice';
import TimeAgo from '../../components/global/TimeAgo';

const Notification = () => {
  const { _user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listOfNotification = useSelector(getNotifications);

  // click away listener
  const handleClick = () => setOpen((prev) => !prev);
  const handleClickAway = () => setOpen(false);

  useEffect(() => {
    if (_user?._id) {
      dispatch(selectAllNotification(_user?._id));
    }
  }, [_user?._id, dispatch]);

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
            <Badge color='error' badgeContent={0} max={99}>
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {open ? (
            <Box
              sx={{
                position: 'absolute',
                top: 42,
                right: -20,
                maxHeight: 'calc(100vh - 200px)',
                zIndex: 1,
                width: 320,
                boxShadow: 10,
                borderRadius: 1,
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
                      borderRadius: 2,
                      px: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: '#f2f2f2',
                      },
                    }}
                    onClick={() =>
                      navigate(
                        `/room/${notif?.company_id}/tasks/${notif?.task_id}`
                      )
                    }
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
                      flexGrow={1}
                    >
                      <Typography
                        variant='body2'
                        fontWeight={700}
                        height={20}
                        width={240}
                        maxHeight={20}
                        MaxWidth={240}
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {notif?.name} created a task
                      </Typography>

                      <Typography
                        variant='body2'
                        fontWeight={500}
                        height={20}
                        width={240}
                        maxHeight={20}
                        MaxWidth={240}
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {notif?.title}
                      </Typography>

                      <TimeAgo timestamp={notif?.updatedAt} />
                    </Box>
                  </Box>
                ))}
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>

      {/* delete notification */}
      {/* <Modal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Fragment>
          <DeleteTask
            task={task}
            handleDeleteModalClose={handleDeleteModalClose}
          />
        </Fragment>
      </Modal> */}
    </Fragment>
  );
};
export default Notification;
