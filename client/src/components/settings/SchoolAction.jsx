import { Fragment, useEffect, useState } from 'react';
import { Button, IconButton, Modal, Toolbar, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { StyledModalBox } from '../global';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  getUserInfo,
  updateUserSchoolInfo,
} from '../../features/users/usersSlice';

import NormalTextField from '../forms/NormalTextField';

const ContactAction = () => {
  const user = useSelector(getUserInfo);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { schoolName: '', course: '', major: '' },
  });

  useEffect(() => {
    if (
      user?.internInfo?.schoolName ||
      user?.internInfo?.course ||
      user?.internInfo?.major
    ) {
      setValue('schoolName', user?.internInfo?.schoolName);
      setValue('course', user?.internInfo?.course);
      setValue('position', user?.internInfo?.major);
    }
  }, [
    user?.internInfo?.schoolName,
    user?.internInfo?.course,
    user?.internInfo?.major,
    setValue,
  ]);

  // handle modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = async (data) => {
    const { schoolName, course, major } = data;

    dispatch(
      updateUserSchoolInfo({
        _id: user?._id,
        schoolName,
        course,
        major,
        isIntern: user?.isIntern,
      })
    ).unwrap();

    handleClose();
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
              Edit Your School Information
            </Typography>
          </Toolbar>

          {/* User Information */}

          {/* school name */}
          <NormalTextField
            name='schoolName'
            label='School Name'
            register={register}
            watch={watch}
            message='change your school name here (optional)'
          />

          {/* course */}
          <NormalTextField
            name='course'
            label='Course'
            register={register}
            watch={watch}
            message='change your course here (optional)'
          />

          {/* major */}
          <NormalTextField
            name='major'
            label='Major'
            register={register}
            watch={watch}
            message='change your major here (optional)'
          />

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
      </Modal>
    </Fragment>
  );
};
export default ContactAction;
