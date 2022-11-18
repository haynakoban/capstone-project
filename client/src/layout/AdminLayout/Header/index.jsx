import SideDrawerBar from './SideDrawerBar';

// outlined icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const routes = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <DashboardOutlinedIcon />,
  },
  {
    name: 'Log Reports',
    path: '/logs',
    icon: <AssignmentOutlinedIcon />,
  },
  {
    name: 'Interns',
    path: '/interns',
    icon: <AssignmentIndOutlinedIcon />,
  },
  {
    name: 'Companies',
    path: '/companies',
    icon: <GroupsOutlinedIcon />,
  },
  {
    name: 'Attendances',
    path: '/attendances',
    icon: <AssessmentOutlinedIcon />,
  },
];

const Header = ({ content }) => {
  return <SideDrawerBar routes={routes} content={content} />;
};
export default Header;
