import {
  Button,
  CardContent,
  Divider,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { StyledModalBox, StyledPostBox } from '../global';
import { updatePost } from '../../features/posts/postsSlice';

const UpdatePost = ({ post, handleUpdateModalClose }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      text: post?.text,
      id: post?._id,
    },
  });

  const handleFormSubmit = (data) => {
    dispatch(updatePost(data)).unwrap();

    reset({ text: '' });
    handleUpdateModalClose();
  };

  return (
    <StyledModalBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Toolbar
        sx={{ display: 'flex', justifyContent: 'center' }}
        disableGutters
      >
        <Typography variant='h6' component='h6' fontWeight={700}>
          Update post
        </Typography>
      </Toolbar>

      {/* content of the post */}
      <TextField
        variant='standard'
        fullWidth
        sx={{
          mb: 2,
          'textarea::-webkit-scrollbar': {
            width: '0.4rem',
          },
          'textarea::-webkit-scrollbar-thumb': {
            bgcolor: '#20212880',
          },
          'textarea::-webkit-scrollbar-track': {
            bgcolor: '#20212850',
          },
          '.css-1aqqp93-MuiInputBase-root-MuiInput-root:after': {
            borderBottom: 'none',
          },
          '.css-1aqqp93-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before':
            {
              borderBottom: 'none',
            },
          '.css-1aqqp93-MuiInputBase-root-MuiInput-root:before': {
            borderBottom: 0,
          },
        }}
        required
        type='text'
        multiline
        minRows={4}
        maxRows={20}
        autoComplete='off'
        placeholder='Post your query'
        value={watch('text')}
        {...register('text', { required: true })}
      />

      {post?.filename && (
        <CardContent
          sx={{
            px: 3,
            py: 0,
            mt: 1,
            mb: 1,
          }}
        >
          <StyledPostBox>{post?.filename}</StyledPostBox>
        </CardContent>
      )}

      <Divider flexItem sx={{ bgcolor: '#000000', height: 1.2, mb: 2 }} />

      {/* submit changes */}
      <Button
        variant='contained'
        onClick={handleSubmit(handleFormSubmit)}
        type='submit'
        sx={{ marginX: 'auto' }}
      >
        Save
      </Button>
    </StyledModalBox>
  );
};
export default UpdatePost;
