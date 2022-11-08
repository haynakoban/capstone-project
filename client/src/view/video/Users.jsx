import { Card, CardMedia, Typography } from '@mui/material';
import { Fragment, useEffect, useRef } from 'react';

const Users = ({ peer, name = 'Guest' }) => {
  const ref = useRef();

  useEffect(() => {
    if (peer?.streams?.length > 0) {
      ref.current.srcObject = peer?.streams?.[0];
    } else {
      peer?.on('stream', (stream) => {
        ref.current.srcObject = stream;
      });
    }
  }, [peer]);

  return (
    <Card
      sx={{
        position: 'relative',
      }}
    >
      <Fragment>
        <CardMedia
          component='video'
          sx={{ width: '100%', maxHeight: '100%' }}
          alt='sample 1'
          playsInline
          autoPlay
          ref={ref}
        />
        <Typography
          variant='subtitle1'
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            p: 2,
            color: '#fff',
          }}
        >
          {name}
        </Typography>
      </Fragment>
    </Card>
  );
};
export default Users;
