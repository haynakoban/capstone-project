import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import MainLayout from '../layout/MainLayout';

// images
import HeroContent from '../assets/svg/project_team_lc5a.svg';
import HeroContent2 from '../assets/svg/teaching_re_g7e3_blue.svg';

const Home = () => {
  return (
    <Fragment>
      <MainLayout />

      {/* content */}
      <Toolbar />
      <Container maxWidth='lg' sx={{ p: 1 }}>
        <Stack
          spacing={1}
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          sx={{ my: 2 }}
        >
          <Box p={2} display='flex' flexDirection='column'>
            <Typography
              variant='h4'
              component='h4'
              fontWeight={700}
              fontStyle='italic'
              mb={2}
              sx={{ fontSize: '2.5rem !important' }}
            >
              Let's start your internship here!
            </Typography>
            <Typography variant='body1' component='p' fontWeight={600} mb={2}>
              The only way to do great things is to love what you do.
            </Typography>
            <Typography variant='body1' component='p' fontWeight={600} mb={2}>
              Join Now and Gain Work Experience
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: '#00B0FF',
              borderRadius: 2,
            }}
          >
            <img
              src={HeroContent}
              alt='job hunt'
              className='hero_content'
              width='100%'
            />
          </Box>
        </Stack>
      </Container>

      <Box sx={{ bgcolor: '#202128' }}>
        <Typography
          variant='h5'
          textAlign='center'
          py={3}
          fontWeight={600}
          letterSpacing={0.2}
          sx={{ color: '#ffffff' }}
        >
          How TrainNLearn Works?
        </Typography>

        <Divider
          sx={{ bgcolor: '#f2f2f2', height: 2 }}
          flexItem
          variant='middle'
        />

        <Stack
          spacing={1}
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          justifyContent='center'
          sx={{ p: 2 }}
        >
          <Box
            sx={{
              bgcolor: '#6C63FF',
              borderRadius: 2,
            }}
          >
            <img
              src={HeroContent2}
              alt='job hunt'
              className='hero_content_fitted'
              width='100%'
            />
          </Box>

          <Box p={2} display='flex' flexDirection='column'>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                color: '#fff',
                bgcolor: '#202128',
                border: '1px solid #f2f2f2',
                mb: 2,
              }}
            >
              <Typography
                variant='body1'
                component='p'
                fontWeight={600}
                mb={2}
                textTransform='capitalize'
              >
                1. Register
              </Typography>
              <Typography variant='body1' component='p' fontWeight={600}>
                Fill the sign up form to create an account.
              </Typography>
            </Paper>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                color: '#fff',
                bgcolor: '#202128',
                border: '1px solid #f2f2f2',
                mb: 2,
              }}
            >
              <Typography
                variant='body1'
                component='p'
                fontWeight={600}
                mb={2}
                textTransform='capitalize'
              >
                2. Explore
              </Typography>
              <Typography variant='body1' component='p' fontWeight={600}>
                TrainNLearn makes it very simple to find an internship program
                that you want to participate in. 
              </Typography>
            </Paper>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                color: '#fff',
                bgcolor: '#202128',
                border: '1px solid #f2f2f2',
                mb: 2,
              }}
            >
              <Typography
                variant='body1'
                component='p'
                fontWeight={600}
                mb={2}
                textTransform='capitalize'
              >
                3. Collaborate
              </Typography>
              <Typography variant='body1' component='p' fontWeight={600}>
                Collaborate, communicate, and make friends with your fellow
                interns and employees.
              </Typography>
            </Paper>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                color: '#fff',
                bgcolor: '#202128',
                border: '1px solid #f2f2f2',
                mb: 2,
              }}
            >
              <Typography
                variant='body1'
                component='p'
                fontWeight={600}
                mb={2}
                textTransform='capitalize'
              >
                4. Grow
              </Typography>
              <Typography variant='body1' component='p' fontWeight={600}>
                Enhance your skills, knowledge, experience, and personality to
                create a better life in the future.
              </Typography>
            </Paper>
          </Box>
        </Stack>
      </Box>
    </Fragment>
  );
};
export default Home;
