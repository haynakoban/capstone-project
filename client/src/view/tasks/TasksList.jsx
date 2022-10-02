import { Box, Container } from '@mui/material';

import CreateTaskAction from '../../components/tasks/CreateTaskAction';
import CardStatusTask from '../../components/cards/CardStatusTask';
import TaskCard from '../../components/tasks/TaskCard';
import RoomLayout from '../../layout/RoomLayout';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../../lib/authContext';
import {
  getCompanyInfo,
  getRoomInfo,
} from '../../features/companies/companiesSlice';

import { pendingTasks, completedTasks } from './dummy';

const TasksList = () => {
  const tasks = completedTasks.concat(pendingTasks);
  const ListOfTasks = tasks.map((task) => {
    return <TaskCard task={task} key={task.text} />;
  });

  const [auth, setAuth] = useState(false);
  const { _user, _isUserAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const dispatch = useDispatch();
  const roomInfo = useSelector(getCompanyInfo);

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

          {ListOfTasks}
        </Container>

        {/* list of tasks */}
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
            <CardStatusTask tasks={pendingTasks} name='Pending Tasks' />

            {/* completed - call the card status task */}
            <CardStatusTask tasks={completedTasks} name='Completed Tasks' />
          </Box>
        </Box>
      </Box>
    </RoomLayout>
  );
};
export default TasksList;
