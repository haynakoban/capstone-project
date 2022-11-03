import { Avatar, Box, Card, CardMedia, Typography } from '@mui/material';
import { Fragment } from 'react';
import avatarTheme from '../../lib/avatar';

const VideoPlayer = (props) => {
  const { user } = props;
  return (
    <Card
      sx={{
        position: 'relative',
        height: { xs: 140, sm: 200 },
      }}
    >
      {user.type === 'offcam' ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='100%'
        >
          <Avatar
            sx={{
              bgcolor: avatarTheme({
                name: user?.name?.[0]?.toLowerCase(),
              }),
              width: { xs: 50, sm: 80, md: 100 },
              height: { xs: 50, sm: 80, md: 100 },
            }}
          >
            {user?.name?.[0]?.toUpperCase()}
          </Avatar>
        </Box>
      ) : (
        <Fragment>
          <CardMedia
            component='video'
            sx={{ width: '100%', height: '100%' }}
            src='video here'
            alt='sample 1'
          />
          <Typography
            variant='subtitle1'
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              p: 2,
            }}
          >
            {user?.name}
          </Typography>
        </Fragment>
      )}
    </Card>
  );
};
export default VideoPlayer;
