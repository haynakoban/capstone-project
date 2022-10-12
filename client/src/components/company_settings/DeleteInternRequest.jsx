import { Box, Button, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { declineInternRequest } from '../../features/companies/companiesSlice';
import { StyledModalBox } from '../global';

const DeleteInternRequest = ({ room, req, handleDeleteModalClose }) => {
  const dispatch = useDispatch();

  const handleDecline = ({ id, user_id }) => {
    dispatch(declineInternRequest({ id, user_id }));

    handleDeleteModalClose();
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
        <Typography
          variant='body1'
          color='text.primary'
          component='div'
          textAlign='center'
        >
          Are you sure you want to decline this request from {req?.name}?
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
          onClick={handleDeleteModalClose}
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
          onClick={() =>
            handleDecline({ id: room?._id, user_id: req?.user_id })
          }
        >
          Yes
        </Button>
      </Box>
    </StyledModalBox>
  );
};
export default DeleteInternRequest;
