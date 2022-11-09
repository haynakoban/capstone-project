import { Box, Container, IconButton, Toolbar } from '@mui/material';

import CallEndIcon from '@mui/icons-material/CallEnd';

import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AgoraRTC from 'agora-rtc-sdk-ng';

import { AuthContext } from '../../lib/authContext';

import { VideoPlayer } from './VideoPlayer';

const APP_ID = '80930d9463754831a7af493ff25d2296';
const TOKEN =
  process.env.TOKEN ||
  '007eJxTYPhstlZOIFeg0GBzxQs+5uulO7v3mbEmr5z9IW5Be3H2LnYFBgsDS2ODFEsTM2NzUxMLY8NE88Q0E0vjtDQj0xQjI0uztmXZyQ2BjAzHTLYzMjJAIIjPzBDi58PAAACiDhzz';
const CHANNEL = process.env.CHANNEL || 'TNL';

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

const Video = () => {
  const { _user, _isUserAuth } = useContext(AuthContext);

  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  // securing video conferencing
  useEffect(() => {
    if (!_isUserAuth) {
      window.location = `/login`;
    }
  }, [_isUserAuth]);

  // creating users and local tracks
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  // handles user joined
  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === 'video') {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === 'audio') {
      user.audioTrack.play();
    }
  };

  // handles user left
  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  // handles configuration for audio and video tracks
  useEffect(() => {
    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, _user._id)
      .then((uid) =>
        Promise.all([
          AgoraRTC.createMicrophoneAndCameraTracks({
            audioConfig: {
              ANS: true,
            },
            videoConfig: {
              facingMode: 'user',
            },
          }),
          uid,
        ])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      })
      .catch((e) => {
        window.location = `/room/${room_id}`;
      });

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off('user-published', handleUserJoined);
      client.off('user-left', handleUserLeft);
    };
  }, []);

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
          {users?.map((user, index) => (
            <VideoPlayer key={index} user={user} />
          ))}
        </Box>

        {/* control */}
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '& > button': {
              mx: 1,
            },
            mb: 2,
          }}
        >
          {/* leave call */}
          <IconButton
            size='large'
            sx={{
              bgcolor: '#d32f2f',
              color: '#f2f2f2',
              '&:hover': { bgcolor: '#d32f2f' },
            }}
            onClick={() => {
              window.location = `/room/${room_id}`;
            }}
          >
            <CallEndIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Video;
