import { Box, Container } from '@mui/material';

import CreateTaskAction from '../../components/tasks/CreateTaskAction';
import CardStatusTask from '../../components/cards/CardStatusTask';
import TaskCard from '../../components/tasks/TaskCard';
import RoomLayout from '../../layout/RoomLayout';

import { useContext, useEffect, useState, useTransition } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../../lib/authContext';
import {
  getCompanyInfo,
  getRoomInfo,
} from '../../features/companies/companiesSlice';

import {
  completedTasks,
  fetchTasks,
  getCompletedTasks,
  getPendingTasks,
  pendingTasks,
  selectAllTasks,
} from '../../features/tasks/tasksSlice';

const TasksList = () => {
  const [auth, setAuth] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isPending, startTransition] = useTransition();
  const { _user, _isUserAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const dispatch = useDispatch();
  const roomInfo = useSelector(getCompanyInfo);
  const tasksList = useSelector(selectAllTasks);
  const pending_tasks = useSelector(getPendingTasks);
  const completed_tasks = useSelector(getCompletedTasks);

  useEffect(() => {
    dispatch(getRoomInfo(room_id)).unwrap();

    dispatch(fetchTasks({ company_id: room_id })).unwrap();
  }, [room_id, dispatch]);

  useEffect(() => {
    if (_user?._id) {
      dispatch(pendingTasks(_user?._id));
      dispatch(completedTasks(_user?._id));
    }
  }, [_user?._id, room_id, dispatch]);

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
    if (tasksList) {
      if (_user?.isIntern) {
        startTransition(() => {
          const tasks = tasksList.filter((p) => {
            return p.assignedTo.some((id) => id === _user?._id);
          });

          const orderedTasks = tasks
            ?.slice()
            ?.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

          setTasks(orderedTasks);
        });
      } else {
        startTransition(() => {
          const tasks = tasksList.filter((p) => p.createdBy === _user?._id);

          const orderedTasks = tasks
            ?.slice()
            ?.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

          setTasks(orderedTasks);
        });
      }
    }
  }, [_user?._id, _user?.isIntern, tasksList, dispatch]);

  const ListOfTasks = tasks.map((task) => {
    return <TaskCard task={task} key={task._id} />;
  });

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
          {!_user?.isIntern && <CreateTaskAction members={roomInfo?.members} />}

          {isPending ? <h4>Loading...</h4> : ListOfTasks}
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
export default TasksList;
