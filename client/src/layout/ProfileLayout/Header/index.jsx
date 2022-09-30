import SideDrawerBar from './SideDrawerBar';

// outlined icons
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import { useContext } from 'react';
import { AuthContext } from '../../../lib/authContext';

const Header = ({ content }) => {
  const { _user } = useContext(AuthContext);

  const routes = _user?.isIntern
    ? [
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
          icon: <InsertDriveFileOutlinedIcon />,
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
      ]
    : [
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
      ];

  return <SideDrawerBar routes={routes} content={content} />;
};
export default Header;
