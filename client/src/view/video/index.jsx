import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Modal,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';

import VideoPlayer from './VideoPlayer';
import { Fragment, useContext, useState } from 'react';
import { AuthContext } from '../../lib/authContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledModalBoxAttendance } from '../../components/global';

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
  const { _user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(true);
  const [state, setState] = useState({
    video: true,
    audio: true,
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  // update modal handler
  const handleModalClose = () => setModalOpen(false);

  const handleChangeMediaConstraints = (event, name) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClickMediaConstraints = (prop) => (event) => {
    setState({ ...state, [prop]: !state[prop] });
  };

  const handleSubmit = () => {
    console.log(state, _user, room_id);

    handleModalClose();
  };

  return (
    <Box height='100vh' bgcolor='#363740' overflow='hidden'>
      {!modalOpen && (
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
              onClick={handleClickMediaConstraints('audio')}
            >
              {state?.audio ? <MicIcon /> : <MicOffIcon />}
            </IconButton>

            {/* video button */}
            <IconButton
              size='large'
              sx={{
                bgcolor: '#f2f2f2',
                color: '#363740',
                '&:hover': { bgcolor: '#f2f2f2' },
              }}
              onClick={handleClickMediaConstraints('video')}
            >
              {state?.video ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>

            {/* leave call */}
            <IconButton
              size='large'
              sx={{
                bgcolor: '#d32f2f',
                color: '#f2f2f2',
                '&:hover': { bgcolor: '#d32f2f' },
              }}
              onClick={() => {
                // end call function

                // return to the prev route
                navigate(-1);
              }}
            >
              <CallEndIcon />
            </IconButton>
          </Toolbar>
        </Container>
      )}

      {/* settings */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Fragment>
          <StyledModalBoxAttendance
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='body1'
              component='div'
              fontWeight={600}
              width='100%'
            >
              Device Settings
            </Typography>

            <Divider
              flexItem
              sx={{ bgcolor: '#202128', height: '1px', mt: 1, mb: 3 }}
            />

            {/* settings here */}
            <FormControl component='fieldset' variant='standard'>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.video}
                      onChange={handleChangeMediaConstraints}
                      name='video'
                    />
                  }
                  label='Video'
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.audio}
                      onChange={handleChangeMediaConstraints}
                      name='audio'
                    />
                  }
                  label='Audio'
                />
              </FormGroup>
            </FormControl>

            <Divider
              flexItem
              sx={{ bgcolor: '#202128', height: '1px', mt: 3 }}
            />

            {/* save button */}
            <Box
              display='flex'
              justifyContent='flex-end'
              alignItems='center'
              mt={2}
              px={2}
              width='100%'
            >
              <Button
                variant='outlined'
                onClick={() => navigate(-1)}
                sx={{ mx: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                onClick={handleSubmit}
                type='submit'
                sx={{ mx: 1 }}
              >
                Save
              </Button>
            </Box>
          </StyledModalBoxAttendance>
        </Fragment>
      </Modal>
    </Box>
  );
};

export default Video;
