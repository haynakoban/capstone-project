import { Box, Button, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { StyledModalBox } from '../global';
import { deleteComment } from '../../features/comments/commentsSlice';

const DeleteComment = ({ comment, handleDeleteModalClose }) => {
  const dispatch = useDispatch();

  const { handleSubmit, reset } = useForm({
    defaultValues: {
      id: comment?._id,
    },
  });

  const handleFormSubmit = (data) => {
    dispatch(deleteComment(data)).unwrap();

    reset({ id: '' });
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
        <Typography variant='body1' color='text.primary' component='div'>
          Are you sure you want to delete this comment?
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
          onClick={handleSubmit(handleFormSubmit)}
        >
          Yes
        </Button>
      </Box>
    </StyledModalBox>
  );
};
export default DeleteComment;
