import { Box, Button, Typography } from '@mui/material';

import RoomLayout from '../../layout/RoomLayout';
import CreateDescription from '../../components/description/CreateDescription';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { AuthContext } from '../../lib/authContext';
import { StyledContainer } from '../../components/global';
import {
  getCompanyInfo,
  getRoomInfo,
} from '../../features/companies/companiesSlice';

const Description = () => {
  const { _user, _isUserAuth } = useContext(AuthContext);
  const [auth, setAuth] = useState(false);

  const dispatch = useDispatch();
  const roomInfo = useSelector(getCompanyInfo);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  useEffect(() => {
    dispatch(getRoomInfo(room_id)).unwrap();
  }, [room_id, dispatch]);

  useEffect(() => {
    if (!_isUserAuth) {
      navigate('/login');
    }
    if (_user?._id && _user?.isIntern) {
      navigate(`/room/${room_id}`);
    }
  }, [room_id, _isUserAuth, _user?._id, _user?.isIntern, navigate]);

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
      {/* company room code */}
      <StyledContainer width='md'>
        <Typography variant='body1' fontStyle='oblique'>
          To Join Room with other Employee
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: { xs: 'center', sm: 'space-between' },
            alignItems: { xs: 'center', sm: 'space-between' },
            my: 1,
            p: 2,
            borderRadius: '0.9rem !important',
            border: '1px solid #20212850',
            hyphens: 'auto',
            overflowWrap: 'break-word',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
        >
          <Typography
            variant='h6'
            fontWeight={600}
            textAlign='center'
            mb={{ xs: 1, sm: 0 }}
          >
            {roomInfo?.companyName}
          </Typography>

          <CopyToClipboard text={roomInfo?.roomCode}>
            <Button variant='contained' sx={{ textTransform: 'capitalize' }}>
              Copy Room Code
            </Button>
          </CopyToClipboard>
        </Box>
      </StyledContainer>

      {/* company description */}
      <StyledContainer width='md' mt={3}>
        {roomInfo?.description !== '' ? (
          <Fragment>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography variant='h6' fontWeight={600}>
                Company Description:
              </Typography>

              <CreateDescription type='edit' />
            </Box>

            <Typography
              variant='body1'
              component='pre'
              sx={{
                my: 1,
                p: 2,
                borderRadius: '0.9rem !important',
                border: '1px solid #20212850',
                hyphens: 'auto',
                overflowWrap: 'break-word',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
              }}
            >
              {roomInfo?.description}
            </Typography>
          </Fragment>
        ) : (
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='h6'>No company description</Typography>

            <CreateDescription type='add' />
          </Box>
        )}
      </StyledContainer>
    </RoomLayout>
  );
};
export default Description;
