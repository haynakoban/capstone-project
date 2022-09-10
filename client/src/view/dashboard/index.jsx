import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import DashboardHeader from '../../components/dashboard/header';
import AnnouncementPost from '../../components/dashboard/body';
import DashboardFooter from '../../components/dashboard/footer';
import { Fragment } from 'react';
import RoomLayout from '../../layout/Room';

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
  return (
    <Fragment>
      <RoomLayout />
      <Box display='flex' flexDirection='column'>
        {/* header */}
        {/* interns remaining and completed hours */}
        <DashboardHeader />

        {/* body */}
        {/* announcements */}
        <AnnouncementPost />

        {/* footer */}
        {/* member and tasks */}
        <DashboardFooter Tasks={Tasks} Member={Member} />
      </Box>
    </Fragment>
  );
};
export default Dashboard;
