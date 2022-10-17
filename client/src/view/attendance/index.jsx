import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';

import { a11yProps, TabPanel } from '../../components/company_settings/';

import { useState } from 'react';
import RoomLayout from '../../layout/RoomLayout';

import { DateToday } from '../../lib/DateFormatter';
import { StyledContainer } from '../../components/global';
import { Daily, Monthly, Summary } from '../../components/attendance';

const Attendance = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
            <Daily />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Monthly />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Summary />
          </TabPanel>
        </Box>
      </StyledContainer>
    </RoomLayout>
  );
};
export default Attendance;
