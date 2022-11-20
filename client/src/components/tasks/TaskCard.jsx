import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Toolbar,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { TimeAgo } from '../global';
import avatarTheme from '../../lib/avatar';
import { AuthContext } from '../../lib/authContext';
import {
  DailyAttendanceDateFormatter,
  TimeFormatter,
} from '../../lib/DateFormatter';
import { createLog } from '../../features/logs/logsSlice';

const TaskCard = ({ task }) => {
  const { _user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const DateFormatter = (date) => {
    const d = new Date(`${date}`);

    return `${format(d, 'MMMM d, yyyy hh:mm a')}`;
  };

  return (
    <Card elevation={2} sx={{ mb: 3 }} key={task._id}>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: avatarTheme({
                name: task?.name?.[0]?.toLowerCase(),
              }),
            }}
            aria-label='recipe'
          >
            {task?.name?.[0]?.toUpperCase()}
          </Avatar>
        }
        action={
          <Toolbar
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Typography variant='body2' fontWeight={700}>
              Due {DateFormatter(task?.date?.due)}
            </Typography>
            <Typography variant='body2' fontWeight={700}>
              Closes {DateFormatter(task?.date?.closes)}
            </Typography>
          </Toolbar>
        }
        title={task?.name}
        subheader={<TimeAgo timestamp={task?.updatedAt} />}
      />
      <CardContent
        sx={{
          px: 3,
          py: 0,
          mb: 2,
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant='body2' fontWeight={700}>
          Due {DateFormatter(task?.date?.due)}
        </Typography>
        <Typography variant='body2' fontWeight={700}>
          Closes {DateFormatter(task?.date?.closes)}
        </Typography>
      </CardContent>

      <CardContent
        sx={{
          px: 3,
          py: 0,
        }}
      >
        <Typography variant='h6' fontWeight={700} mb={2}>
          {task?.title}
        </Typography>

        <Button
          variant='outlined'
          sx={{ px: '23px' }}
          onClick={() => {
            const date = new Date();

            // create log
            if (_user?.isIntern) {
              dispatch(
                createLog({
                  user_id: _user?._id,
                  report_date: DailyAttendanceDateFormatter(date),
                  time: TimeFormatter(date),
                  user_type: 'Intern',
                  log: `Viewed a task (${task?.title})`,
                })
              );
            } else {
              dispatch(
                createLog({
                  user_id: _user?._id,
                  report_date: DailyAttendanceDateFormatter(date),
                  time: TimeFormatter(date),
                  user_type: 'Employee',
                  log: `Viewed a task (${task?.title})`,
                })
              );
            }

            navigate(`/room/${room_id}/tasks/${task?._id}`);
          }}
        >
          View Task
        </Button>
      </CardContent>
    </Card>
  );
};
export default TaskCard;
