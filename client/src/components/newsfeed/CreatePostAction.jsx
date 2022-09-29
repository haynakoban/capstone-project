import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { getUserInfo } from '../../features/users/usersSlice';

import { StyledModalBox } from '../global';
import { addNewPost } from '../../features/posts/postsSlice';

const CreatePostAction = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserInfo);

  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const [open, setOpen] = useState(false);

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: { text: '', user_id: '', company_id: '' },
  });

  useEffect(() => {
    if (user?._id && room_id) {
      setValue('user_id', user?._id);
      setValue('company_id', room_id);
    }
  }, [user?._id, room_id, setValue]);

  // handle modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (data) => {
    dispatch(addNewPost(data)).unwrap();

    reset({ text: '' });
    handleClose();
  };

  return (
    <Fragment>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          variant='contained'
          startIcon={<EditIcon />}
          sx={{ textTransform: 'capitalize', mb: 2 }}
          onClick={handleOpen}
        >
          Create Post
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
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
              Create new post
            </Typography>
          </Toolbar>

          {/* User Information */}
          {/* content of the post */}
          <TextField
            variant='standard'
            fullWidth
            className='comment'
            sx={{
              mb: 2,
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

          <Divider flexItem sx={{ bgcolor: '#000000', height: 1.2, mb: 2 }} />

          {/* submit changes */}
          <Button
            variant='contained'
            onClick={handleSubmit(handleFormSubmit)}
            type='submit'
            sx={{ marginX: 'auto' }}
          >
            Post
          </Button>
        </StyledModalBox>
      </Modal>
    </Fragment>
  );
};
export default CreatePostAction;
