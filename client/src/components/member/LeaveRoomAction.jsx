import { Box, Button, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { leaveRoom } from '../../features/users/usersSlice';

import { StyledModalBox } from '../global';

const LeaveRoomAction = ({ id, handleModalClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLeaveRoom = () => {
    dispatch(leaveRoom({ id }));

    handleModalClose();
    navigate('/');
  };

  return (
    <StyledModalBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Toolbar sx={{ display: 'flex', flexDirection: 'column' }} disableGutters>
        <Typography variant='body1' color='text.primary' component='div'>
          Are you sure you want to leave this room?
        </Typography>
        <Typography
          variant='subtitle1'
          component='span'
          sx={{ color: '#dc3545' }}
        >
          ( this action is irreversible )
        </Typography>
      </Toolbar>
      <Box sx={{ textAlign: 'right' }}>
        <Button
          color='secondary'
          sx={{
            color: '#000000',
            mr: 1.5,
          }}
          onClick={handleModalClose}
        >
          Cancel
        </Button>
        <Button
          variant='outlined'
          color='error'
          type='submit'
          sx={{
            color: '#dc3545',
          }}
          onClick={handleLeaveRoom}
        >
          Yes
        </Button>
      </Box>
    </StyledModalBox>
  );
};
export default LeaveRoomAction;
