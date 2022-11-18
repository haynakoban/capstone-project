import { Button, IconButton, Modal, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';

import RoomField from '../forms/RoomField';
import DescriptionField from '../forms/DescriptionField';
import PrivacyField from '../forms/PrivacyField';

import { Fragment, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { StyledModalBox } from '../global';
import { createNewRoom } from '../../features/companies/companiesSlice';
import { AuthContext } from '../../lib/authContext';

const CreateRoom = ({ id, handleCreateRoomOpen }) => {
  const { _user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // handle modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roomName: '',
      description: '',
      showRoom: true,
    },
  });

  const handleFormSubmit = async (data) => {
    const { roomName, description, showRoom } = data;

    dispatch(
      createNewRoom({
        roomName,
        companyName: _user?.employeeInfo?.company?.name ?? '',
        description,
        showRoom,
        members: id,
      })
    ).unwrap();

    handleCreateRoomOpen();
    handleClose();
    reset({ roomName: '', description: '', showRoom: true });
  };

  return (
    <Fragment>
      <Button
        variant='outlined'
        startIcon={<GroupAddOutlinedIcon />}
        onClick={handleOpen}
      >
        Create Room
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
              Create a new room
            </Typography>
            <IconButton edge='end' onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
          {/* Room Name */}
          <RoomField
            errors={errors.roomName?.message}
            name='roomName'
            label='Room Name'
            register={register}
            watch={watch}
            minlen={4}
          />

          {/* Description of the Room */}
          <DescriptionField
            name='description'
            label='Description'
            register={register}
            watch={watch}
            message={`you can add description later once you decided. This field is optional`}
          />

          <PrivacyField
            name='showRoom'
            label='Privacy'
            register={register}
            watch={watch}
          />

          {/* create room */}
          <Button
            variant='contained'
            onClick={handleSubmit(handleFormSubmit)}
            type='submit'
            sx={{ marginX: 'auto' }}
          >
            Create
          </Button>
        </StyledModalBox>
      </Modal>
    </Fragment>
  );
};
export default CreateRoom;
