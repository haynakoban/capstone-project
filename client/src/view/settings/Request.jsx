import { Container } from '@mui/material';

// import { IconButton, Paper, Stack, Typography } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import {
//   StackContainer,
//   StyledContainer,
//   StyledStack,
// } from '../../components/global';

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../lib/authContext';

import ProfileLayout from '../../layout/ProfileLayout';

const Request = () => {
  const navigate = useNavigate();
  const { _user, _isUserAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!_isUserAuth) {
      navigate('/login');
    }
    if (!_user?.isIntern) {
      navigate('/settings/account');
    }
  }, [_isUserAuth, _user?.isIntern, navigate]);

  return (
    <ProfileLayout>
      <Container maxWidth='md'>Request</Container>
    </ProfileLayout>
  );
};
export default Request;
