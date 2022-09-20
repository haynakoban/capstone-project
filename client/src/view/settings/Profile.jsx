import { IconButton, Paper, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {
  StackContainer,
  StyledContainer,
  StyledStack,
} from '../../components/global';

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileLayout from '../../layout/ProfileLayout';
import { AuthContext } from '../../lib/authContext';

import {
  CompanyAction,
  ContactAction,
  ProfileAction,
  SchoolAction,
} from '../../components/settings';

const Profile = () => {
  const navigate = useNavigate();
  const { _user, _isUserAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!_isUserAuth) {
      navigate('/login');
    }
  }, [_isUserAuth, navigate]);

  return (
    <ProfileLayout>
      <StyledContainer width='lg'>
        {/* profile: can add additional information here */}
        {/* like address and/or gender */}
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
              Profile
            </Typography>
            <ProfileAction />
          </Stack>

          <StackContainer>
            {_user?.name && (
              <StyledStack>
                <Typography variant='caption'>Name</Typography>
                <Typography variant='body1'>{_user?.name}</Typography>
              </StyledStack>
            )}
            {_user?.gender && (
              <StyledStack>
                <Typography variant='caption'>Gender</Typography>
                <Typography variant='body1'>{_user?.gender}</Typography>
              </StyledStack>
            )}
            {_user?.address && (
              <StyledStack>
                <Typography variant='caption'>Address</Typography>
                <Typography variant='body1'>{_user?.address}</Typography>
              </StyledStack>
            )}
          </StackContainer>
        </Paper>

        {/* contact: can change your phone number here */}
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
              Contact
            </Typography>
            <ContactAction />
          </Stack>

          <StackContainer>
            {_user?.phoneNumber && (
              <StyledStack>
                <Typography variant='caption'>Phone Number</Typography>
                <Typography variant='body1'>{_user?.phoneNumber}</Typography>
              </StyledStack>
            )}
            {_user?.email && (
              <StyledStack borderBottom='1px solid #20212850'>
                <Typography variant='caption'>Email Address</Typography>
                <Typography variant='body1'>{_user?.email}</Typography>
              </StyledStack>
            )}
          </StackContainer>
        </Paper>

        {/* school and company: can add additional information here */}
        {/* for school: school name, course, and/or major */}
        {/* for company: company name, department, and/or position */}
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
              {_user?.isIntern ? 'School' : 'Company'}
            </Typography>
            {_user?.isIntern ? <SchoolAction /> : <CompanyAction />}
          </Stack>

          {_user?.isIntern ? (
            <StackContainer>
              {_user?.internInfo?.school?.name && (
                <StyledStack>
                  <Typography variant='caption'>School Name</Typography>
                  <Typography variant='body1'>
                    {_user?.internInfo?.school?.name}
                  </Typography>
                </StyledStack>
              )}
              {_user?.internInfo?.school?.course && (
                <StyledStack>
                  <Typography variant='caption'>Course</Typography>
                  <Typography variant='body1'>
                    {_user?.internInfo?.school?.course}
                  </Typography>
                </StyledStack>
              )}
              {_user?.internInfo?.school?.major && (
                <StyledStack borderBottom='1px solid #20212850'>
                  <Typography variant='caption'>Major</Typography>
                  <Typography variant='body1'>
                    {_user?.internInfo?.school?.major}
                  </Typography>
                </StyledStack>
              )}
            </StackContainer>
          ) : (
            <StackContainer>
              {_user?.employeeInfo?.company?.name && (
                <StyledStack>
                  <Typography variant='caption'>Company Name</Typography>
                  <Typography variant='body1'>
                    {_user?.employeeInfo?.company?.name}
                  </Typography>
                </StyledStack>
              )}
              {_user?.employeeInfo?.company?.department && (
                <StyledStack>
                  <Typography variant='caption'>Department</Typography>
                  <Typography variant='body1'>
                    {_user?.employeeInfo?.company?.department}
                  </Typography>
                </StyledStack>
              )}
              {_user?.employeeInfo?.company?.position && (
                <StyledStack borderBottom='1px solid #20212850'>
                  <Typography variant='caption'>Position</Typography>
                  <Typography variant='body1'>
                    {_user?.employeeInfo?.company?.position}
                  </Typography>
                </StyledStack>
              )}
            </StackContainer>
          )}
        </Paper>

        {/* security: can change username and password here */}
        <Paper elevation={3} sx={{ p: 2, border: '1px solid #00000020' }}>
          <Stack
            mb={0.5}
            display='flex'
            direction='row'
            justifyContent='space-between'
          >
            <Typography variant='h6' fontWeight={700}>
              Security
            </Typography>
            <IconButton size='small'>
              <EditIcon />
            </IconButton>
          </Stack>

          <StackContainer>
            {_user?.username && (
              <StyledStack>
                <Typography variant='caption'>Username</Typography>
                <Typography variant='body1'>{_user?.username}</Typography>
              </StyledStack>
            )}
            <StyledStack>
              <Typography variant='caption'>Password</Typography>
              <Typography variant='body1'>************</Typography>
            </StyledStack>
          </StackContainer>
        </Paper>
      </StyledContainer>
    </ProfileLayout>
  );
};
export default Profile;
