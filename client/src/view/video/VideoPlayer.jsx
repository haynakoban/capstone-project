import { Card } from '@mui/material';
import { useEffect, useRef } from 'react';

export const VideoPlayer = ({ user }) => {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <Card
      ref={ref}
      sx={{
        position: 'relative',
        height: { xs: 140, sm: 200 },
      }}
    ></Card>
  );
};
