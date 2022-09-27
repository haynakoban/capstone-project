import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import DashboardHeader from '../../components/dashboard/header';
import AnnouncementPost from '../../components/dashboard/body';
import DashboardFooter from '../../components/dashboard/footer';
import RoomLayout from '../../layout/RoomLayout';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AuthContext } from '../../lib/authContext';
import { getRoomInfo } from '../../features/companies/companiesSlice';

const Tasks = [
  {
    text: 'Back-end Development ',
    icon: <RadioButtonUncheckedIcon />,
  },
  {
    text: 'Front-end Development',
    icon: <CheckCircleIcon color='primary' />,
  },
  {
    text: 'UI/UX DESIGNING',
    icon: <CheckCircleIcon color='primary' />,
  },
];

const Member = [
  {
    active: '29',
    users: 'Interns',
  },
  {
    active: '5',
    users: 'Employers',
  },
  {
    active: '34',
    users: 'All',
  },
];

const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const { _user, _isUserAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const dispatch = useDispatch();

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
    _user?.isIntern,
    _user?.internInfo?.companyInfo?.company_id,
    _user?.employeeInfo?.listOfCompanies,
    room_id,
    navigate,
  ]);

  return (
    <RoomLayout>
      <Box display='flex' flexDirection='column'>
        {/* header */}
        {/* interns remaining and completed hours or;*/}
        {/* meet up start button;*/}
        <DashboardHeader _user={_user} />

        {/* body */}
        {/* announcements */}
        <AnnouncementPost />

        {/* footer */}
        {/* member and tasks */}
        <DashboardFooter Tasks={Tasks} Member={Member} />
      </Box>
    </RoomLayout>
  );
};
export default Dashboard;
