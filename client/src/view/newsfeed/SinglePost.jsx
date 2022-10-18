import { Box, Container, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../../lib/authContext';
import {
  getCompanyInfo,
  getRoomInfo,
} from '../../features/companies/companiesSlice';
import { getMyPostById, selectPostById } from '../../features/posts/postsSlice';

import RoomLayout from '../../layout/RoomLayout';
import CardMemberIcon from '../../components/cards/CardMemberIcon';
import SingleCardPost from '../../components/newsfeed/SingleCardPost';

const SinglePost = () => {
  const [auth, setAuth] = useState(false);
  const { _user, _isUserAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const dispatch = useDispatch();
  const roomInfo = useSelector(getCompanyInfo);

  const post = useSelector(getMyPostById);

  useEffect(() => {
    dispatch(selectPostById({ company_id: room_id, id }));
  }, [id, room_id, dispatch]);

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

  let content;
  if (Object.keys(post).length === 0) {
    content = <h4>Loading...</h4>;
  } else {
    content = <SingleCardPost post={post} />;
  }

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
            onClick={() => navigate(`/room/${room_id}/newsfeed`)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          {content}
        </Container>

        {/* members */}
        <CardMemberIcon members={roomInfo.members?.slice(0, 5)} />
      </Box>
    </RoomLayout>
  );
};
export default SinglePost;
