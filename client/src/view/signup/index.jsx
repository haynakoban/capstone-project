import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  isUserAuthorized,
  isUserLoggedIn,
} from '../../features/users/usersSlice';

import axios from '../../lib/axiosConfig';
import Logo from '../../layout/MainLayout/Header/Logo';

import SignUpContainer from '../../components/global/SignUpContainer';
import TextInputField from '../../components/forms/TextInputField';
import UsernameField from '../../components/forms/UsernameField';
import PasswordField from '../../components/forms/PasswordField';
import EmailField from '../../components/forms/EmailField';

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      userType: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  // is user authorize
  const isUserAuthorize = useSelector(isUserAuthorized);

  // handle visible routes
  useEffect(() => {
    dispatch(isUserLoggedIn()).unwrap();
  }, [dispatch]);

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
    const { name, username, email, password, confirmPassword } = data;

    if (data.userType === 'intern') {
      data.userType = true;
    } else {
      data.userType = false;
    }

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
        isIntern: data.userType,
        password,
      });

      if (res.data?.username && res.data?._id) {
        navigate('/');
      }
    }
  };

  return (
    <Fragment>
      {isUserAuthorize ? (
        <Navigate to='/' />
      ) : (
        <SignUpContainer>
          <Paper
            elevation={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              border: '1px solid #00000030',
              width: {
                xs: '100%',
                sm: 420,
                md: 420,
              },
              position: 'relative',
            }}
          >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <IconButton aria-label='logo' edge='start'>
                <Logo w={30} />
              </IconButton>
              <Typography variant='h5' component='h5' fontWeight={700} ml={2}>
                Sign Up Form
              </Typography>
              <IconButton
                aria-label='back'
                edge='end'
                onClick={() => navigate('/')}
              >
                <ChevronLeftIcon sx={{ color: '#000' }} />
              </IconButton>
            </Toolbar>
            <Divider sx={{ height: 1.5, bgcolor: '#000', mb: 2 }} />

            <Box
              sx={{
                px: {
                  xs: 2,
                  sm: 5,
                },
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
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

              {/* intern or employee */}
              <FormControl
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  mb: 2,
                }}
                required
                {...(errors.userType?.message && { error: true })}
              >
                <FormLabel id='demo-row-radio-buttons-group-label'>
                  Type :
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                >
                  <FormControlLabel
                    value='intern'
                    control={<Radio />}
                    label='Intern'
                    {...register('userType', {
                      required: 'This field is required',
                    })}
                  />
                  <FormControlLabel
                    value='employee'
                    control={<Radio />}
                    label='Employee'
                    {...register('userType', {
                      required: 'This field is required',
                    })}
                  />
                </RadioGroup>
                <FormHelperText id='radio-buttons'>
                  {errors.userType?.message && errors.userType?.message}
                </FormHelperText>
              </FormControl>

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
              <Typography
                variant='subtitle'
                component='span'
                color='text.primary'
                textAlign='right'
                fontWeight={500}
                mt={1.5}
                mb={2.5}
              >
                Already have an account?{' '}
                <Typography
                  variant='subtitle'
                  component='span'
                  color='primary.main'
                  textAlign='right'
                  fontWeight={500}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Typography>
              </Typography>
            </Box>
          </Paper>
        </SignUpContainer>
      )}
    </Fragment>
  );
};
export default SignUpPage;
