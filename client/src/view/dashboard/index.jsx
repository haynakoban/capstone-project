import { Box, Container, Typography } from '@mui/material';

import RoomLayout from '../../layout/RoomLayout';
import DashboardHeader from '../../components/dashboard/header';
import PostCard from '../../components/dashboard/PostCard';
import CardMemberIcon from '../../components/cards/CardMemberIcon';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../../lib/authContext';
import {
  getCompanyInfo,
  getRoomInfo,
} from '../../features/companies/companiesSlice';
import {
  fetchLatestPost,
  selectLatestPost,
} from '../../features/posts/postsSlice';
import {
  fetchMySummaryAttendance,
  getMySummaryAttendances,
} from '../../features/attendances/attendancesSlice';

const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const { _user, _isUserAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const latest_post = useSelector(selectLatestPost);
  const room_info = useSelector(getCompanyInfo);
  const working_hours = useSelector(getMySummaryAttendances);
  const dispatch = useDispatch();

  useEffect(() => {
    if (room_id) {
      dispatch(fetchLatestPost({ company_id: room_id })).unwrap();
    }
  }, [room_id, dispatch]);

  useEffect(() => {
    dispatch(getRoomInfo(room_id)).unwrap();

    if (_user?._id) {
      dispatch(
        fetchMySummaryAttendance({ company_id: room_id, user_id: _user?._id })
      );
    }
  }, [room_id, _user?._id, dispatch]);

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

  let content;
  if (latest_post.length > 0) {
    content = <PostCard post={latest_post} />;
  }

  return (
    <RoomLayout>
      <Box display='flex' justifyContent='space-between'>
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
          {/* header */}
          {/* interns remaining and completed hours or;*/}
          {/* meet up start button;*/}
          <DashboardHeader _user={_user} working_hours={working_hours} />

          {/* body */}
          {/* announcements */}
          <Box mt={3}>
            <Typography
              variant='body1'
              component='div'
              letterSpacing={1}
              fontWeight={600}
              textTransform='uppercase'
              pl={3}
              mb={1}
            >
              Latest Post :
            </Typography>

            {/* the post details */}
            {content}
          </Box>

          {/* can insert another design here */}
        </Container>

        {/* members */}
        <CardMemberIcon members={room_info.members?.slice(0, 5)} />
      </Box>
    </RoomLayout>
  );
};
export default Dashboard;
