import SideDrawerBar from './SideDrawerBar';

// filled icons
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import FeedIcon from '@mui/icons-material/Feed';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import GroupsIcon from '@mui/icons-material/Groups';
// import AssessmentIcon from '@mui/icons-material/Assessment';

// outlined icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const routes = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <DashboardOutlinedIcon />,
  },
  {
    name: 'Newsfeed',
    path: '/newsfeed',
    icon: <FeedOutlinedIcon />,
  },
  {
    name: 'Tasks',
    path: '/tasks',
    icon: <AssignmentOutlinedIcon />,
  },
  {
    name: 'Member',
    path: '/member',
    icon: <GroupsOutlinedIcon />,
  },
  {
    name: 'Attendance',
    path: '/attendance',
    icon: <AssessmentOutlinedIcon />,
  },
];

const Header = ({ content }) => {
  return <SideDrawerBar routes={routes} content={content} />;
};
export default Header;
