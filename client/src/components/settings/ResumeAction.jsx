import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Modal,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { StyledModalBox, StyledBox } from '../global';
import { getUserInfo, updateUserDocs } from '../../features/users/usersSlice';
import axios from '../../lib/axiosConfig';

const ResumeAction = () => {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector(getUserInfo);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: { resume: [], cv: [], letter: [] },
  });

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
    const { resume, cv, letter } = data;
    const fd = new FormData();
    if (resume[0]) fd.append('resume', resume[0], resume[0]?.name);
    if (cv[0]) fd.append('cv', cv[0], cv[0]?.name);
    if (letter[0]) fd.append('letter', letter[0], letter[0]?.name);

    fd.append('_id', user?._id);
    fd.append('isIntern', user?.isIntern);

    axios
      .put(`api/users/uploads`, fd, options)
      .then((res) => {
        dispatch(updateUserDocs(res.data.user));
      })
      .catch((err) => console.error(err));
  };

  return (
    <Fragment>
      <IconButton size='small' onClick={handleOpen}>
        <EditIcon />
      </IconButton>
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
              Edit Your Documents
            </Typography>
          </Toolbar>

          {/* User documents */}

          <blockquote className='blockquote fs-6'>
            Upload your resume, cv, or application letter
          </blockquote>

          <Stack sx={{ width: '100%' }}>
            <Typography variant='subtitle2' pl={1}>
              Resume:
            </Typography>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              spacing={2}
            >
              <StyledBox>
                {!watch('resume')[0] ? 'Empty' : watch('resume')[0]?.name}
              </StyledBox>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='label'
              >
                <input
                  hidden
                  name='resume'
                  accept='.doc,.docx,.pdf'
                  type='file'
                  {...register('resume')}
                />
                <FileUploadOutlinedIcon />
              </IconButton>
            </Stack>
          </Stack>
          {watch('resume')[0] && progress > 0 && (
            <Box sx={{ width: 296, alignSelf: 'flex-start', mt: 1 }}>
              <LinearProgress
                variant='determinate'
                color='success'
                value={progress}
              />
            </Box>
          )}

          <Stack sx={{ width: '100%', mt: 2 }}>
            <Typography variant='subtitle2' pl={1}>
              Curriculum Vitae:
            </Typography>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              spacing={2}
            >
              <StyledBox>
                {!watch('cv')[0] ? 'Empty' : watch('cv')[0]?.name}
              </StyledBox>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='label'
              >
                <input
                  hidden
                  name='cv'
                  accept='.doc,.docx,.pdf'
                  type='file'
                  {...register('cv')}
                />
                <FileUploadOutlinedIcon />
              </IconButton>
            </Stack>
          </Stack>

          {watch('cv')[0] && progress > 0 && (
            <Box sx={{ width: 296, alignSelf: 'flex-start', mt: 1 }}>
              <LinearProgress
                variant='determinate'
                color='success'
                value={progress}
              />
            </Box>
          )}

          <Stack sx={{ width: '100%', mt: 2 }}>
            <Typography variant='subtitle2' pl={1}>
              Application Letter:
            </Typography>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              spacing={2}
            >
              <StyledBox>
                {!watch('letter')[0] ? 'Empty' : watch('letter')[0]?.name}
              </StyledBox>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='label'
              >
                <input
                  hidden
                  name='letter'
                  accept='.doc,.docx,.pdf'
                  type='file'
                  {...register('letter')}
                />
                <FileUploadOutlinedIcon />
              </IconButton>
            </Stack>
          </Stack>

          {watch('letter')[0] && progress > 0 && (
            <Box sx={{ width: 296, alignSelf: 'flex-start', mt: 1 }}>
              <LinearProgress
                variant='determinate'
                color='success'
                value={progress}
              />
            </Box>
          )}

          {/* submit changes */}
          <Button
            variant='contained'
            onClick={handleSubmit(handleFormSubmit)}
            type='submit'
            sx={{ marginX: 'auto', mt: 2 }}
          >
            Save
          </Button>
        </StyledModalBox>
      </Modal>
    </Fragment>
  );
};
export default ResumeAction;
