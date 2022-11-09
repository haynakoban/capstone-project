import { Box, Container, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import TaskCard from '../../components/tasks/TaskCard';
import RoomLayout from '../../layout/RoomLayout';

import { useContext, useEffect, useState, useTransition } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../../lib/authContext';
import { getRoomInfo } from '../../features/companies/companiesSlice';

import {
  fetchTasks,
  getPendingTasks,
  pendingTasks,
} from '../../features/tasks/tasksSlice';

const PendingTask = () => {
  const [auth, setAuth] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isPending, startTransition] = useTransition();
  const { _user, _isUserAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const dispatch = useDispatch();
  const pending_tasks = useSelector(getPendingTasks);

  useEffect(() => {
    dispatch(getRoomInfo(room_id)).unwrap();

    dispatch(fetchTasks({ company_id: room_id })).unwrap();
  }, [room_id, dispatch]);

  useEffect(() => {
    if (_user?._id) {
      dispatch(pendingTasks(_user?._id));
    }
  }, [_user?._id, dispatch]);

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
    if (pending_tasks) {
      if (_user?.isIntern) {
        startTransition(() => {
          const tasks = pending_tasks?.filter((p) => {
            return p.assignedTo.some((id) => id === _user?._id);
          });

          const orderedTasks = tasks
            ?.slice()
            ?.sort((a, b) => b.updatedAt?.localeCompare(a.updatedAt));

          setTasks(orderedTasks);
        });
      } else {
        startTransition(() => {
          const tasks = pending_tasks?.filter(
            (p) => p.createdBy === _user?._id
          );

          const orderedTasks = tasks
            ?.slice()
            ?.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

          setTasks(orderedTasks);
        });
      }
    }
  }, [_user?._id, _user?.isIntern, pending_tasks, dispatch]);

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
          <IconButton
            sx={{ mb: 2 }}
            size='large'
            // get the company id
            onClick={() => navigate(`/room/${room_id}/tasks`)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {isPending ? <h4>Loading...</h4> : ListOfTasks}
        </Container>
      </Box>
    </RoomLayout>
  );
};
export default PendingTask;
