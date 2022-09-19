import { Box, CardMedia, Stack, Typography } from '@mui/material';
import { StyledContainer } from '../../components/global';
import photo from '../../assets/sample/logo2_(bnb).png';

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
      <StyledContainer width='lg'>
        {[1, 2, 3, 5, 6].map((_, i) => (
          <Box
            key={i}
            sx={{
              p: 2,
              mb: 3,
              border: '1px solid #20212870',
            }}
          >
            <Stack
              display='flex'
              direction='row'
              justifyContent='space-between'
            >
              <Box display='flex' flexDirection='column'>
                <Typography variant='h6' fontWeight={700}>
                  Google
                </Typography>
                <Typography variant='caption'>7 days ago</Typography>
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
        ))}
      </StyledContainer>
    </ProfileLayout>
  );
};
export default Request;
