import { Box, Button, CardMedia, Stack, Typography } from '@mui/material';
import { StackContainer, StyledContainer } from '../../components/global';
import photo from '../../assets/sample/logo2_(bnb).png';

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../lib/authContext';

import ProfileLayout from '../../layout/ProfileLayout';

const Invitation = () => {
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
      <StyledContainer width="lg">
        {/* list of invitation will appear here */}
        {_user?.internInfo?.offers?.length > 0
          ? _user?.internInfo?.offers?.map((offer) => (
              <Box
                key={offer?.company_id}
                sx={{
                  p: { xs: 2, sm: 2, md: 3 },
                  mb: 3,
                  border: '1px solid #20212870',
                }}
              >
                <Stack
                  mb={1}
                  display="flex"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="h6" fontWeight={700}>
                    {offer?.company_name}
                  </Typography>

                  <CardMedia
                    component="img"
                    sx={{ width: 40 }}
                    image={photo}
                    alt="just a normal"
                    className="company_logo"
                  />
                </Stack>

                <StackContainer>
                  <Typography variant="body1">
                    {offer?.company_name} accepts your application. If you wish
                    to complete your internship program with{' '}
                    {offer?.company_name}.
                  </Typography>
                  <Typography variant="body1" mt={0.75}>
                    Kindly accept the invitation.
                  </Typography>

                  <Box sx={{ mt: { xs: 1, sm: 2 } }}>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        mr: 2,
                        color: '#fff',
                      }}
                      onClick={() => console.log('join the room')}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => console.log('delete request')}
                    >
                      Decline
                    </Button>
                  </Box>
                </StackContainer>
              </Box>
            ))
          : 'No Offer'}
      </StyledContainer>
    </ProfileLayout>
  );
};
export default Invitation;
