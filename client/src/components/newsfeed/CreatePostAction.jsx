import {
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Modal,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import axios from '../../lib/axiosConfig';
import { getUserInfo } from '../../features/users/usersSlice';
import { addNewPost } from '../../features/posts/postsSlice';
import { StyledPostBox, StyledModalBox } from '../global';

const CreatePostAction = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserInfo);

  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: { text: '', file: [], user_id: '', company_id: '' },
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

  const options = {
    onUploadProgress: (p) => {
      const { loaded, total } = p;
      let precentage = Math.floor((loaded * 100) / total);
      setProgress(Math.floor((loaded * 100) / total));

      if (precentage === 100) {
        setTimeout(() => {
          setProgress(0);
        }, 1000);
      }
    },
  };

  const handleFormSubmit = (data) => {
    const { file, text, user_id, company_id } = data;
    const fd = new FormData();

    if (text || file.length > 0) {
      if (file[0]) fd.append('file', file[0], file[0]?.name);
      if (text) fd.append('text', text);

      fd.append('user_id', user_id);
      fd.append('company_id', company_id);

      axios
        .post(`api/posts`, fd, options)
        .then((res) => {
          if (res.data?.post && res.data?.user?.[0]) {
            dispatch(addNewPost(res.data));
          }
        })
        .catch((err) => console.error(err))
        .finally(() =>
          setTimeout(() => {
            reset({
              text: '',
              file: [],
              user_id: user?._id,
              company_id: room_id,
            });
            handleClose();
          }, 500)
        );
    }
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
            mb: 1,
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
            type='text'
            multiline
            minRows={4}
            maxRows={20}
            autoComplete='off'
            placeholder='Post your query'
            value={watch('text')}
            {...register('text')}
          />

          <Stack
            direction='row'
            justifyContent='flex-end'
            alignItems='center'
            spacing={2}
            width='100%'
            mb={1}
          >
            {watch('file')?.[0] && (
              <StyledPostBox>{watch('file')?.[0]?.name}</StyledPostBox>
            )}

            <IconButton
              sx={{ color: '#202128' }}
              color='primary'
              aria-label='upload picture'
              component='label'
            >
              <input
                hidden
                name='file'
                accept='.doc,.docx,.pdf'
                type='file'
                {...register('file')}
              />
              <FileUploadOutlinedIcon />
            </IconButton>
          </Stack>

          {progress > 0 && (
            <Box sx={{ width: '100%', alignSelf: 'flex-start' }}>
              <LinearProgress
                variant='determinate'
                color='success'
                value={progress}
              />
            </Box>
          )}

          <Divider flexItem sx={{ bgcolor: '#000000', height: 1.2, mb: 2 }} />

          {/* submit changes */}
          <Button
            variant='contained'
            onClick={handleSubmit(handleFormSubmit)}
            type='submit'
            sx={{ marginX: 'auto' }}
            {...(progress > 0 && { disabled: true })}
          >
            Post
          </Button>
        </StyledModalBox>
      </Modal>
    </Fragment>
  );
};
export default CreatePostAction;
