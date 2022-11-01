import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { Button, IconButton, Modal, Toolbar, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { StyledModalBox } from '../global';
import {
  changeAccountInfo,
  getUserInfo,
} from '../../features/users/usersSlice';

import ChangeUsernameField from '../forms/ChangeUsernameField';
import OldPassword from '../forms/OldPassword';
import PasswordField from '../forms/PasswordField';
import ConfirmPassword from '../forms/ConfirmPassword';

const AccountAction = () => {
  const user = useSelector(getUserInfo);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    showOldPassword: false,
    showPassword: false,
    showConfirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      id: '',
      username: '',
      old_password: '',
      password: '',
      confirm_password: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (user?._id) {
      setValue('username', user?.username ?? '');
      setValue('id', user?._id ?? '');
    }
  }, [user?._id, user?.username, setValue]);

  // handle modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };
  const handleClickShowOldPassword = () => {
    setValues({
      ...values,
      showOldPassword: !values.showOldPassword,
    });
  };

  const handleFormSubmit = async (data) => {
    const { id, username, password } = data;

    dispatch(changeAccountInfo({ id, username, password }));

    setTimeout(() => {
      handleClose();
    }, 100);
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
              Account Information
            </Typography>
          </Toolbar>

          {/* User Information */}
          {/* username */}
          <ChangeUsernameField
            errors={errors.username?.message}
            name='username'
            label='Username'
            register={register}
            watch={watch}
            minlen={4}
            oldUsername={user?.username}
          />

          {/* old password */}
          <OldPassword
            errors={errors.old_password?.message}
            name='old_password'
            label='Old Password'
            register={register}
            watch={watch}
            minlen={8}
            maxlen={20}
            showPassword={values.showOldPassword}
            handleShowPassword={handleClickShowOldPassword}
            id={watch('id')}
          />

          {/* password */}
          <PasswordField
            errors={errors.password?.message}
            name='password'
            label='New Password'
            register={register}
            watch={watch}
            minlen={8}
            maxlen={20}
            showPassword={values.showPassword}
            handleShowPassword={handleClickShowPassword}
          />

          {/* confirm password */}
          <ConfirmPassword
            errors={errors.confirm_password?.message}
            name='confirm_password'
            label='Confirm Password'
            register={register}
            watch={watch}
            minlen={8}
            maxlen={20}
            showPassword={values.showConfirmPassword}
            handleShowPassword={handleClickShowConfirmPassword}
            confirmPassword={watch('password')}
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
export default AccountAction;
