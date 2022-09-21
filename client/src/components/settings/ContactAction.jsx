import { Fragment, useEffect, useState } from 'react';
import { Button, IconButton, Modal, Toolbar, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { StyledModalBox } from '../global';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  getUserInfo,
  updateUserContactInfo,
} from '../../features/users/usersSlice';

import TextInputField from '../forms/TextInputField';
import EmailField from '../forms/EmailField';

const ContactAction = () => {
  const user = useSelector(getUserInfo);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { phoneNumber: '', email: '' } });

  useEffect(() => {
    if (user?.phoneNumber || user?.email) {
      setValue('phoneNumber', user?.phoneNumber);
      setValue('email', user?.email);
    }
  }, [user?.phoneNumber, user?.email, setValue]);

  // handle modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = async (data) => {
    const { phoneNumber, email } = data;

    dispatch(
      updateUserContactInfo({
        _id: user?._id,
        phoneNumber,
        email,
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

          {/* phone number */}
          <TextInputField
            errors={errors.phoneNumber?.message}
            name='phoneNumber'
            label='Contact Number'
            register={register}
            watch={watch}
          />

          {/* email */}
          <EmailField
            errors={errors.email?.message}
            name='email'
            label='Emaill Address'
            register={register}
            watch={watch}
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
