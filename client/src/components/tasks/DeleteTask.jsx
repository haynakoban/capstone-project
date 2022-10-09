import {
  Box,
  Button,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { StyledModalBox } from '../global';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../lib/axiosConfig';
import { useState } from 'react';

const DeleteTask = ({ task, handleDeleteModalClose }) => {
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(0, 30);

  const { handleSubmit, reset } = useForm({
    defaultValues: {
      id: task?._id,
    },
  });

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
    axios
      .delete(`api/tasks/${data.id}`, options)
      .then(() => {})
      .catch((err) => console.error(err))
      .finally(() =>
        setTimeout(() => {
          reset({ id: '' });
          handleDeleteModalClose();
          navigate(`${room_id}/tasks`);
        }, 500)
      );
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
          Are you sure you want to delete this task?
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
          {...(progress > 0 && { disabled: true })}
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
          {...(progress > 0 && { disabled: true })}
        >
          Yes
        </Button>
      </Box>

      {/* progress bar */}
      {progress > 0 && (
        <Box sx={{ width: '100%', alignSelf: 'flex-start', mt: 1 }}>
          <LinearProgress
            variant='determinate'
            color='success'
            value={progress}
          />
        </Box>
      )}
    </StyledModalBox>
  );
};
export default DeleteTask;
