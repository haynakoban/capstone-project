import { Paper, Stack, Typography } from '@mui/material';
import {
  StackContainer,
  StyledContainer,
  StyledStack,
} from '../../components/global';

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../lib/authContext';

import ProfileLayout from '../../layout/ProfileLayout';
import { ResumeAction } from '../../components/settings';

const Resume = () => {
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
        {/* resume: can upload your resume, cv, or application letter here */}
        <Paper
          elevation={3}
          sx={{ p: 2, mb: 3, border: '1px solid #00000020' }}
        >
          <Stack
            mb={0.5}
            display='flex'
            direction='row'
            justifyContent='space-between'
          >
            <Typography variant='h6' fontWeight={700}>
              Resume
            </Typography>
            <ResumeAction />
          </Stack>

          <StackContainer>
            {_user?.docs?.resume?.file_name && (
              <StyledStack>
                <Typography variant='caption'>Resume</Typography>
                <Typography variant='body1'>
                  {_user?.docs?.resume?.file_name}
                </Typography>
              </StyledStack>
            )}
            {_user?.docs?.cv?.file_name && (
              <StyledStack>
                <Typography variant='caption'>CV</Typography>
                <Typography variant='body1'>
                  {_user?.docs?.cv?.file_name}
                </Typography>
              </StyledStack>
            )}
            {_user?.docs?.letter?.file_name && (
              <StyledStack>
                <Typography variant='caption'>Application Letter</Typography>
                <Typography variant='body1'>
                  {_user?.docs?.letter?.file_name}
                </Typography>
              </StyledStack>
            )}
          </StackContainer>
        </Paper>
      </StyledContainer>
    </ProfileLayout>
  );
};
export default Resume;
