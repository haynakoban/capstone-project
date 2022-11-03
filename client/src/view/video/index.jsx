import { Box, Container } from '@mui/material';

import VideoPlayer from './VideoPlayer';
import Control from './Control';

const users = [
  { name: 'Bryan Cortez', type: 'offcam' },
  { name: 'Xenon Vergara', type: 'oncam' },
  { name: 'Rizza Mia Servanda', type: 'offcam' },
  { name: 'Thea Mae Rirao', type: 'offcam' },
  { name: 'Bien Enriquez', type: 'offcam' },
  { name: 'Allana Shane Baterina', type: 'oncam' },
  { name: 'Iris Ysabel Bernabe', type: 'offcam' },
  { name: 'Carol Beneto', type: 'oncam' },
  { name: 'Aaron Quesada', type: 'offcam' },
  { name: 'Jeremy Laxamana', type: 'oncam' },
  { name: 'Kurth Novesteras', type: 'offcam' },
  { name: 'Charles Flores', type: 'offcam' },
  { name: 'Joshua Romar Jamandre', type: 'offcam' },
  { name: 'Bryan Madrigalejos', type: 'offcam' },
  { name: 'Jayvi Gonzales', type: 'offcam' },
  { name: 'Jim Kenneth Lopez', type: 'oncam' },
  { name: 'Patrick Suarez', type: 'oncam' },
  { name: 'James Pablo Manzano', type: 'offcam' },
  { name: 'Zyrus Tacano', type: 'offcam' },
  { name: 'Erica Lor', type: 'offcam' },
  { name: 'Mikaela Viado', type: 'offcam' },
  { name: 'Jeorge Agustin', type: 'offcam' },
];

const Video = () => {
  return (
    <Box height='100vh' bgcolor='#363740' overflow='hidden'>
      <Container
        maxWidth='md'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          height: 'inherit',
        }}
      >
        {/* list of user */}
        <Box
          display='grid'
          gap='8px'
          gridTemplateColumns='repeat(2, minmax(100px, 50%))'
          justifyContent='center'
          alignContent={users?.length > 8 ? 'start' : 'center'}
          height={{ xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' }}
          mb={2}
          sx={{ overflowY: 'auto' }}
          className='video'
          p={1}
        >
          {users.map((user, index) => (
            <VideoPlayer key={index} user={user} />
          ))}
        </Box>

        {/* control */}
        <Control />
      </Container>
    </Box>
  );
};

export default Video;
