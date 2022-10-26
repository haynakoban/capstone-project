import { Box, Tab, Tabs } from '@mui/material';
import RoomLayout from '../../layout/RoomLayout';

import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { a11yProps, TabPanel } from '../../components/company_settings/';
import { AuthContext } from '../../lib/authContext';
import { StyledContainer } from '../../components/global';
import {
  getCompanyInfo,
  getRoomInfo,
} from '../../features/companies/companiesSlice';

import Request from '../../components/company_settings/Request';
import Pending from '../../components/company_settings/Pending';
import WorkingTime from '../../components/company_settings/WorkingTime';

const CompanySettings = () => {
  const { _user, _isUserAuth } = useContext(AuthContext);
  const [auth, setAuth] = useState(false);
  const [value, setValue] = useState(0);

  const dispatch = useDispatch();
  const roomInfo = useSelector(getCompanyInfo);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <StyledContainer width='md'>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
            >
              <Tab label='Request' {...a11yProps(0)} />
              <Tab label='Pending' {...a11yProps(1)} />
              <Tab label='Working Time' {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {roomInfo?.request?.length > 0
              ? roomInfo?.request
                  ?.slice(0)
                  .reverse()
                  ?.map((req) => (
                    <Request req={req} key={req.user_id} room={roomInfo} />
                  ))
              : 'No Request'}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {roomInfo?.pending?.length > 0
              ? roomInfo?.pending
                  ?.slice(0)
                  .reverse()
                  ?.map((pen) => <Pending pen={pen} key={pen.user_id} />)
              : 'No Pending'}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {roomInfo?._id && (
              <WorkingTime
                company_id={roomInfo?._id}
                isOn={roomInfo?.time?.isOn}
                start_time={roomInfo?.time?.start_time}
                end_time={roomInfo?.time?.end_time}
              />
            )}
          </TabPanel>
        </Box>
      </StyledContainer>
    </RoomLayout>
  );
};
export default CompanySettings;
