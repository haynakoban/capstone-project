import {
  Box,
  Button,
  Divider,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { StyledModalBox } from '../global';
import { updateComment } from '../../features/comments/commentsSlice';

const UpdateComment = ({ comment, handleUpdateModalClose }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      text: comment?.text,
      id: comment?._id,
    },
  });

  const handleFormSubmit = (data) => {
    dispatch(updateComment(data)).unwrap();

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
          Update Comment
        </Typography>
      </Toolbar>

      {/* content of the comment */}

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField
          variant='standard'
          fullWidth
          sx={{
            mb: 2,
            px: 1.75,
            py: 0.4,
            borderRadius: '0.9rem !important',
            border: '1px solid #20212850',
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
          placeholder='Update a comment'
          value={watch('text')}
          {...register('text', { required: true })}
        />
      </Box>

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
export default UpdateComment;
