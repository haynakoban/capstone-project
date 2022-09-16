import SideDrawerBar from './SideDrawerBar';

// outlined icons
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';

const routes = [
  {
    name: 'Home',
    path: '/',
    icon: <ArrowBackOutlinedIcon />,
  },
  {
    name: 'General',
    path: '/settings/account',
    icon: <SettingsOutlinedIcon />,
  },
  {
    name: 'Resume',
    path: '/settings/resume',
    icon: <ArticleOutlinedIcon />,
  },
  {
    name: 'Invitation',
    path: '/settings/invitation',
    icon: <MailOutlinedIcon />,
  },
  {
    name: 'Request',
    path: '/settings/request',
    icon: <PendingActionsOutlinedIcon />,
  },
];

const Header = ({ content }) => {
  return <SideDrawerBar routes={routes} content={content} />;
};
export default Header;
