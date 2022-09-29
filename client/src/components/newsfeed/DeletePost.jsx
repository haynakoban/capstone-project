import { Box, Button, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { StyledModalBox } from '../global';
import { deletePost } from '../../features/posts/postsSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const DeletePost = ({ post, handleDeleteModalClose }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(0, 30);

  const { handleSubmit, reset } = useForm({
    defaultValues: {
      id: post?._id,
    },
  });

  const handleFormSubmit = (data) => {
    dispatch(deletePost(data)).unwrap();

    reset({ id: '' });
    handleDeleteModalClose();
    navigate(`${room_id}/newsfeed`);
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
          Are you sure you want to delete this post?
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
export default DeletePost;
