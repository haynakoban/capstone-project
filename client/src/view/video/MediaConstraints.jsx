import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { StyledModalBoxAttendance } from '../../components/global';

const MediaConstraints = ({ user, handleModalClose }) => {
  const [state, setState] = useState({
    video: true,
    audio: true,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = () => {
    console.log(state, user);

    handleModalClose();
    // navigate to the video conf
  };

  return (
    <StyledModalBoxAttendance
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='body1' component='div' fontWeight={600} width='100%'>
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
                onChange={handleChange}
                name='video'
              />
            }
            label='Video'
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.audio}
                onChange={handleChange}
                name='audio'
              />
            }
            label='Audio'
          />
        </FormGroup>
      </FormControl>

      <Divider flexItem sx={{ bgcolor: '#202128', height: '1px', mt: 3 }} />

      {/* save button */}
      <Box
        display='flex'
        justifyContent='flex-end'
        alignItems='center'
        mt={2}
        px={2}
        width='100%'
      >
        <Button variant='outlined' onClick={handleModalClose} sx={{ mx: 1 }}>
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
  );
};
export default MediaConstraints;
