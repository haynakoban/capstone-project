import { Box, CardMedia, Stack, Typography } from '@mui/material';
import { StyledContainer } from '../../components/global';
import photo from '../../assets/sample/logo2_(bnb).png';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../lib/authContext';

import ProfileLayout from '../../layout/ProfileLayout';
import { TimeAgo } from '../../components/global';

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

  let content;

  if (_user?.internInfo?.pending.length <= 0) {
    content = 'No pending request';
  } else {
    content = _user?.internInfo?.pending
      ?.slice(0)
      .reverse()
      .map((req) => (
        <Box
          key={req.company_id}
          sx={{
            p: 2,
            mb: 3,
            border: '1px solid #20212870',
          }}
        >
          <Stack display='flex' direction='row' justifyContent='space-between'>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h6' fontWeight={700}>
                {req.company_name}
              </Typography>
              <TimeAgo timestamp={req.createdAt} />
            </Box>

            <CardMedia
              component='img'
              sx={{ width: 51.906 }}
              image={photo}
              alt='just a normal'
              className='company_logo'
            />
          </Stack>
        </Box>
      ));
  }

  return (
    <ProfileLayout>
      <StyledContainer width='lg'>{content}</StyledContainer>
    </ProfileLayout>
  );
};
export default Request;
