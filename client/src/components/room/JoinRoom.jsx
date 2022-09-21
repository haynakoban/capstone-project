import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  OutlinedInput,
  Toolbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { StyledModalBox } from '../global';
// import TextInputField from '../forms/TextInputField';
import { joinRoom } from '../../features/companies/companiesSlice';

const JoinRoom = ({ id, handleJoinRoomOpen }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  // handle modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      companyName: '',
      roomCode: '',
    },
  });

  const handleFormSubmit = async (data) => {
    const { companyName, roomCode } = data;

    const result = await dispatch(
      joinRoom({
        companyName,
        roomCode,
        id,
      })
    ).unwrap();

    if (result.rooms) {
      setError('');
      handleJoinRoomOpen();
      handleClose();
      reset({
        companyName: '',
        roomCode: '',
      });
    } else {
      setError(result?.err);
    }
  };

  return (
    <Fragment>
      <Button
        variant='outlined'
        startIcon={<GroupsOutlinedIcon />}
        onClick={handleOpen}
      >
        Join Room
      </Button>
      <Modal
        keepMounted
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
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              px: 1,
            }}
            disableGutters
          >
            <Typography variant='h6' component='h6' fontWeight={700}>
              Join Room
            </Typography>
            <IconButton edge='end' onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>

          {error && (
            <Typography
              variant='subtitle1'
              component='div'
              mb={1}
              sx={{ color: '#dc3545' }}
            >
              {error}
            </Typography>
          )}

          {/* Company Name */}
          <FormControl
            variant='outlined'
            fullWidth
            sx={{ my: 1 }}
            required
            {...(error && { error: true })}
          >
            <InputLabel htmlFor='Company Name'>Company Name</InputLabel>
            <OutlinedInput
              autoComplete='off'
              id='Company Name'
              type='text'
              label='Company Name'
              value={watch('companyName')}
              {...register('companyName', {
                required: 'This field is required',
              })}
            />
          </FormControl>

          {/* Room Code */}
          <FormControl
            variant='outlined'
            fullWidth
            sx={{ mt: 1, mb: 2 }}
            required
            {...(error && { error: true })}
          >
            <InputLabel htmlFor='Company Name'>Enter Code</InputLabel>
            <OutlinedInput
              autoComplete='off'
              id='Enter Code'
              type='text'
              label='Enter Code'
              value={watch('roomCode')}
              {...register('roomCode', {
                required: 'This field is required',
              })}
            />
          </FormControl>

          {/* create room */}
          <Button
            variant='contained'
            onClick={handleSubmit(handleFormSubmit)}
            type='submit'
            sx={{ marginX: 'auto' }}
          >
            Join
          </Button>
        </StyledModalBox>
      </Modal>
    </Fragment>
  );
};

export default JoinRoom;
