import {
  Box,
  Button,
  Divider,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../layout/Header/Logo';
import bgphoto from '../../assets/svg/real_time_collaboration_c62i.svg';

const SignUpContainer = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 0,
  height: '100vh',
  backgroundImage: `url(${bgphoto})`,
  backgroundColor: '#f2f2f2',
  [theme.breakpoints.down('sm')]: {
    backgroundPosition: '80% 0%',
    height: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    height: 'auto',
  },
}));

const SignUpPage = () => {
  const [values, setValues] = useState({
    name: '',
    username: '',
    email: '',
    userType: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
  return (
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
        <Divider sx={{ height: 1.5, bgcolor: '#000' }} />

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
          <FormControl variant='outlined' fullWidth sx={{ mt: 2 }} required>
            <InputLabel htmlFor='outlined-adornment-fullname'>
              Full Name
            </InputLabel>
            <OutlinedInput
              autoComplete='off'
              id='outlined-adornment-fullname'
              type='text'
              value={values.name}
              onChange={handleChange('name')}
              label='Full Name'
            />
            <FormHelperText id='outlined-fullname-helper-text'>
              Ex. John D. Snow
            </FormHelperText>
          </FormControl>

          {/* intern or employee */}
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              alignItems: 'center',
              justifyContent: 'space-evenly',
              mb: 0.5,
            }}
            required
          >
            <FormLabel id='demo-row-radio-buttons-group-label'>
              Type :
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              onChange={handleChange('userType')}
            >
              <FormControlLabel
                value='intern'
                control={<Radio />}
                label='Intern'
              />
              <FormControlLabel
                value='employee'
                control={<Radio />}
                label='Employee'
              />
            </RadioGroup>
          </FormControl>

          {/* username */}
          <FormControl variant='outlined' fullWidth sx={{ mb: 2 }} required>
            <InputLabel htmlFor='outlined-adornment-username'>
              Username
            </InputLabel>
            <OutlinedInput
              autoComplete='off'
              id='outlined-adornment-username'
              type='text'
              value={values.username}
              onChange={handleChange('username')}
              label='Username'
            />
          </FormControl>

          {/* password */}
          <FormControl variant='outlined' fullWidth sx={{ mb: 2 }} required>
            <InputLabel htmlFor='outlined-adornment-password'>
              Password
            </InputLabel>
            <OutlinedInput
              autoComplete='off'
              id='outlined-adornment-password'
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>

          {/* confirm password */}
          <FormControl variant='outlined' fullWidth sx={{ mb: 2 }} required>
            <InputLabel htmlFor='outlined-adornment-confirm-password'>
              Confirm Password
            </InputLabel>
            <OutlinedInput
              autoComplete='off'
              id='outlined-adornment-confirm-password'
              type={values.showConfirmPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle confirm password visibility'
                    onClick={handleClickShowConfirmPassword}
                    edge='end'
                  >
                    {values.showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label='Confirm Password'
            />
          </FormControl>

          {/* email */}
          <FormControl variant='outlined' fullWidth sx={{ mb: 2 }} required>
            <InputLabel htmlFor='outlined-adornment-email'>
              Email Address
            </InputLabel>
            <OutlinedInput
              autoComplete='off'
              id='outlined-adornment-email'
              type='text'
              value={values.email}
              onChange={handleChange('email')}
              label='Email Address'
            />
          </FormControl>

          {/* phone number */}
          <FormControl variant='outlined' fullWidth sx={{ mb: 2 }} required>
            <InputLabel htmlFor='outlined-adornment-contact-number'>
              Contact Number
            </InputLabel>
            <OutlinedInput
              autoComplete='off'
              id='outlined-adornment-contact-number'
              type='text'
              value={values.phoneNumber}
              onChange={handleChange('phoneNumber')}
              label='Contact Number'
            />
          </FormControl>

          <Button variant='contained'>Submit</Button>
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
  );
};
export default SignUpPage;
