import { Box, Tab, Tabs } from '@mui/material';
import RoomLayout from '../../layout/RoomLayout';

import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../lib/authContext';
import { StyledContainer } from '../../components/global';
import { useSelector } from 'react-redux';
import { getCompanyInfo } from '../../features/companies/companiesSlice';
import { a11yProps, TabPanel } from '../../components/company_settings/';
import Request from '../../components/company_settings/Request';

const CompanySettings = () => {
  const { _user, _isUserAuth } = useContext(AuthContext);
  const [auth, setAuth] = useState(false);
  const [value, setValue] = useState(0);

  const roomInfo = useSelector(getCompanyInfo);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {roomInfo?.request?.length > 0
              ? roomInfo?.request?.map((req) => (
                  <Request req={req} key={req.user_id} />
                ))
              : 'No Request'}
          </TabPanel>
          <TabPanel value={value} index={1}>
            Pending
          </TabPanel>
        </Box>
      </StyledContainer>
    </RoomLayout>
  );
};
export default CompanySettings;
