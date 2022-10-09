import { Fragment, useState } from 'react';
import { Button, IconButton, Modal, Toolbar, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { StyledModalBox } from '../global';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  getUserInfo,
  updateUserCompanyInfo,
} from '../../features/users/usersSlice';

import NormalTextField from '../forms/NormalTextField';

const ContactAction = () => {
  const user = useSelector(getUserInfo);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { companyName: '', department: '', position: '' },
  });

  useEffect(() => {
    if (
      user?.employeeInfo?.companyName ||
      user?.employeeInfo?.department ||
      user?.employeeInfo?.department
    ) {
      setValue('companyName', user?.employeeInfo?.companyName);
      setValue('department', user?.employeeInfo?.department);
      setValue('position', user?.employeeInfo?.position);
    }
  }, [
    user?.employeeInfo?.companyName,
    user?.employeeInfo?.department,
    user?.employeeInfo?.position,
    setValue,
  ]);

  // handle modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = async (data) => {
    const { companyName, department, position } = data;

    dispatch(
      updateUserCompanyInfo({
        _id: user?._id,
        companyName,
        department,
        position,
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
              Edit Your Company Information
            </Typography>
          </Toolbar>

          {/* User Information */}

          {/* company name */}
          <NormalTextField
            name='companyName'
            label='Company Name'
            register={register}
            watch={watch}
            message='change your company name here (optional)'
          />

          {/* department */}
          <NormalTextField
            name='department'
            label='Department'
            register={register}
            watch={watch}
            message='change your department here (optional)'
          />

          {/* position */}
          <NormalTextField
            name='position'
            label='Position'
            register={register}
            watch={watch}
            message='change your position here (optional)'
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
