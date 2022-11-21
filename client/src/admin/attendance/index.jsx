import { Box, Tab, Tabs } from '@mui/material';

import { useState, useContext, useEffect } from 'react';

import { a11yProps, TabPanel } from '../../components/company_settings/';
import { StyledContainer } from '../../components/global';

import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../lib/authContext';

import AdminDaily from './daily';
import AdminMonthly from './monthly';
import AdminSummary from './summary';
import AdminLayout from '../../layout/AdminLayout';

const AdminAttendancePage = () => {
  const { _isUserAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!_isUserAuth) {
      navigate('/login');
    }
  }, [_isUserAuth, navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AdminLayout>
      <StyledContainer width='lg'>
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
            <AdminDaily />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AdminMonthly />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AdminSummary />
          </TabPanel>
        </Box>
      </StyledContainer>
    </AdminLayout>
  );
};
export default AdminAttendancePage;
