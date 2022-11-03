import { IconButton, Toolbar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CallEndIcon from '@mui/icons-material/CallEnd';

import { useState } from 'react';

const Control = () => {
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);

  return (
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
      {/* mic button */}
      <IconButton
        size='large'
        sx={{
          bgcolor: '#f2f2f2',
          color: '#363740',

          '&:hover': { bgcolor: '#f2f2f2' },
        }}
        onClick={() => setMicOn((prev) => !prev)}
      >
        {micOn ? <MicIcon /> : <MicOffIcon />}
      </IconButton>

      {/* video button */}
      <IconButton
        size='large'
        sx={{
          bgcolor: '#f2f2f2',
          color: '#363740',
          '&:hover': { bgcolor: '#f2f2f2' },
        }}
        onClick={() => setVideoOn((prev) => !prev)}
      >
        {videoOn ? <VideocamIcon /> : <VideocamOffIcon />}
      </IconButton>

      {/* users */}
      {/* <IconButton
        size='large'
        sx={{
          bgcolor: '#f2f2f2',
          color: '#363740',
          '&:hover': { bgcolor: '#f2f2f2' },
        }}
      >
        <PeopleAltIcon />
      </IconButton> */}

      {/* leave call */}
      <IconButton
        size='large'
        sx={{
          bgcolor: '#d32f2f',
          color: '#f2f2f2',
          '&:hover': { bgcolor: '#d32f2f' },
        }}
      >
        <CallEndIcon />
      </IconButton>
    </Toolbar>
  );
};
export default Control;
