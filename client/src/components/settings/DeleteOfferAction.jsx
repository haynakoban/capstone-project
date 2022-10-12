import { Box, Button, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { declineCompanyOffer } from '../../features/users/usersSlice';
import { StyledModalBox } from '../global';

const DeleteOfferAction = ({ user_id, offer, handleDeleteModalClose }) => {
  const dispatch = useDispatch();

  const handleDecline = ({ user_id, company_id }) => {
    dispatch(declineCompanyOffer({ user_id, company_id }));

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
          Are you sure you want to delete this offer from {offer?.company_name}?
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
            handleDecline({ user_id, company_id: offer?.company_id })
          }
        >
          Yes
        </Button>
      </Box>
    </StyledModalBox>
  );
};
export default DeleteOfferAction;
