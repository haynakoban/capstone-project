import { Box, Container, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import RoomLayout from '../../layout/RoomLayout';
import CardStatusTask from '../../components/cards/CardStatusTask';
import SingleTaskCard from '../../components/tasks/SingleTaskCard';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../../lib/authContext';
import { getRoomInfo } from '../../features/companies/companiesSlice';
import {
  completedTasks,
  getCompletedTasks,
  getPendingTasks,
  getTaskById,
  pendingTasks,
  selectSingleTask,
} from '../../features/tasks/tasksSlice';

const SingleTask = () => {
  const [auth, setAuth] = useState(false);
  const { _user, _isUserAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const dispatch = useDispatch();
  const task = useSelector(getTaskById);
  const pending_tasks = useSelector(getPendingTasks);
  const completed_tasks = useSelector(getCompletedTasks);

  useEffect(() => {
    if (_user?._id) {
      dispatch(
        selectSingleTask({ company_id: room_id, id, user_id: _user?._id })
      );

      dispatch(pendingTasks(_user?._id));
      dispatch(completedTasks(_user?._id));
    }
  }, [_user?._id, id, room_id, dispatch]);

  useEffect(() => {
    dispatch(getRoomInfo(room_id)).unwrap();
  }, [room_id, dispatch]);

  useEffect(() => {
    if (!_isUserAuth) {
      navigate('/login');
    }
  }, [_isUserAuth, navigate]);

  useEffect(() => {
    if (auth) {
      if (_user?.employeeInfo?.listOfCompanies?.length > 0) {
        const res = _user?.employeeInfo?.listOfCompanies?.some(
          (e) => e.company_id === room_id
        );

        if (!res) navigate('/room');
      } else if (_user?.internInfo?.companyInfo?.company_id) {
        if (_user?.internInfo?.companyInfo?.company_id !== room_id) {
          navigate('/room');
        }
      }
    } else {
      setAuth(true);
    }
  }, [
    auth,
    _user?.internInfo?.companyInfo?.company_id,
    _user?.employeeInfo?.listOfCompanies,
    room_id,
    navigate,
  ]);

  useEffect(() => {
    if (_user?._id && (task?.createdBy || task?.assignedTo?.length > 0)) {
      const res =
        task?.assignedTo?.some((e) => e === _user?._id) ||
        task?.createdBy === _user?._id
          ? true
          : false;

      if (!res) {
        navigate(`/room/${room_id}/tasks`);
      }
    }
  }, [room_id, _user?._id, task?.assignedTo, task?.createdBy, navigate]);

  return (
    <RoomLayout>
      <Box display='flex' justifyContent='space-between'>
        {/* posts */}
        <Container
          maxWidth='md'
          disableGutters
          sx={{
            marginLeft: 0,
            width: {
              xs: '100%',
              sm: '100%',
              md: 'calc(100% - 380px)',
            },
          }}
        >
          <IconButton
            sx={{ mb: 2 }}
            size='large'
            // get the company id
            onClick={() => navigate(`/room/${room_id}/tasks`)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {task && <SingleTaskCard task={task} />}
        </Container>

        {/* list of tasks */}
        {_user?.internInfo && (
          <Box
            maxWidth='xs'
            width={356}
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'block',
                lg: 'block',
              },
              position: 'relative',
            }}
          >
            <Box position='fixed' width='inherit'>
              {/* pending - call the card status task */}
              {pending_tasks?.length > 0 ? (
                <CardStatusTask
                  tasks={pending_tasks?.slice(0, 5)}
                  name='Pending Tasks'
                  type='pending'
                />
              ) : (
                <CardStatusTask
                  no='No Pending Tasks'
                  name='Pending Tasks'
                  type='pending'
                />
              )}
              {/* completed - call the card status task */}
              {completed_tasks?.length > 0 ? (
                <CardStatusTask
                  tasks={completed_tasks?.slice(0, 5)}
                  name='Completed Tasks'
                  type='completed'
                />
              ) : (
                <CardStatusTask
                  no='No Tasks Completed'
                  name='Completed Tasks'
                  type='completed'
                />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </RoomLayout>
  );
};
export default SingleTask;
