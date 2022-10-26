import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';

import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { a11yProps, TabPanel } from '../../components/company_settings/';
import { Daily, Monthly, Summary } from '../../components/attendance';
import { DateToday } from '../../lib/DateFormatter';

import RoomLayout from '../../layout/RoomLayout';
import { AuthContext } from '../../lib/authContext';
import {
  getCompanyInfo,
  getRoomInfo,
} from '../../features/companies/companiesSlice';
import { StyledContainer } from '../../components/global';

const Attendance = () => {
  const [value, setValue] = useState(0);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <StyledContainer width='lg'>
        <Box
          display='flex'
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <Typography fontStyle='italic' fontWeight={700}>
            Today, {DateToday()}
          </Typography>

          {/* if intern show join meet, otherwise create call */}
          <Button
            variant='contained'
            startIcon={<VideocamIcon />}
            sx={{
              textTransform: 'capitalize',
              alignSelf: 'flex-end',
              mt: { xs: 1, sm: 0 },
            }}
            onClick={() => console.log('join a call')}
          >
            Join Meet
          </Button>
        </Box>
      </StyledContainer>

      <StyledContainer width='lg' mt={3}>
        {/* attendance */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='tabs'
              centered
            >
              <Tab
                sx={{ p: 2, letterSpacing: 2 }}
                label='Daily'
                {...a11yProps(0)}
              />
              <Tab
                sx={{ p: 2, letterSpacing: 2 }}
                label='Monthly'
                {...a11yProps(1)}
              />
              <Tab
                sx={{ p: 2, letterSpacing: 2 }}
                label='Summary'
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Daily company_id={roomInfo?._id} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Monthly company_id={roomInfo?._id} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Summary company_id={roomInfo?._id} />
          </TabPanel>
        </Box>
      </StyledContainer>
    </RoomLayout>
  );
};
export default Attendance;
