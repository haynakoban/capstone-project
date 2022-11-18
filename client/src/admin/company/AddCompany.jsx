import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import axios from '../../lib/axiosConfig';
import Logo from '../../layout/MainLayout/Header/Logo';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { StyledModalBoxAttendance } from '../../components/global';
import TextInputField from '../../components/forms/TextInputField';
import UsernameField from '../../components/forms/UsernameField';
import PasswordField from '../../components/forms/PasswordField';
import EmailField from '../../components/forms/EmailField';

const AddCompany = ({ handleModalClose, setSortedName }) => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      companyName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

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

  const handleFormSubmit = async (data) => {
    const { name, username, email, password, confirmPassword, companyName } =
      data;

    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'focus',
        message: 'the password confirmation does not match',
      });
    } else {
      const res = await axios.post('api/users', {
        name,
        username,
        email,
        companyName,
        isIntern: false,
        password,
      });

      if (res.data?.username && res.data?._id) {
        handleModalClose();
        setSortedName((prev) => [...prev, res?.data?.user]);
      }
    }
  };

  return (
    <StyledModalBoxAttendance
      sx={{
        width: '422px !important',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      className='comment'
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton aria-label='logo' edge='start' size='small'>
          <Logo w={30} />
        </IconButton>
        <Typography variant='h6' component='h6' fontWeight={600}>
          Add Company
        </Typography>
        <IconButton
          aria-label='back'
          edge='end'
          size='small'
          onClick={() => navigate('/')}
        >
          <ChevronLeftIcon sx={{ color: '#000' }} />
        </IconButton>
      </Box>

      <Divider
        flexItem
        sx={{ bgcolor: '#202128', height: '1px', mt: 1, mb: 2.5 }}
      />

      {/* form */}
      <Box
        sx={{
          px: {
            xs: 2,
            sm: 5,
          },
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {/* fullname */}
        <TextInputField
          errors={errors.name?.message}
          name='name'
          label='Full Name'
          register={register}
          watch={watch}
        />

        {/* username */}
        <UsernameField
          errors={errors.username?.message}
          name='username'
          label='Username'
          register={register}
          watch={watch}
          minlen={4}
        />

        {/* password */}
        <PasswordField
          errors={errors.password?.message}
          name='password'
          label='Password'
          register={register}
          watch={watch}
          minlen={8}
          maxlen={20}
          showPassword={values.showPassword}
          handleShowPassword={handleClickShowPassword}
        />

        {/* confirm password */}
        <PasswordField
          errors={errors.confirmPassword?.message}
          name='confirmPassword'
          label='Confirm Password'
          register={register}
          watch={watch}
          minlen={8}
          maxlen={20}
          showPassword={values.showConfirmPassword}
          handleShowPassword={handleClickShowConfirmPassword}
        />

        {/* company name */}
        <TextInputField
          errors={errors.companyName?.message}
          name='companyName'
          label='Company Name'
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

        <Button
          variant='contained'
          onClick={handleSubmit(handleFormSubmit)}
          type='submit'
        >
          Submit
        </Button>
      </Box>
    </StyledModalBoxAttendance>
  );
};
export default AddCompany;
