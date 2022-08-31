import {
  Button,
  Fab,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../layout/Header/Logo';
import bgphoto from '../../assets/svg/real_time_collaboration_c62i.svg';

const LogInContainer = styled('div')(({ theme }) => ({
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
  },
}));

const LogInPage = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
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

  return (
    <LogInContainer>
      <Paper
        elevation={6}
        sx={{
          p: {
            xs: 2,
            sm: 5,
          },
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          border: '1px solid #00000030',
          width: {
            xs: '100%',
            sm: 300,
            md: 300,
          },
          position: 'relative',
        }}
      >
        <Fab
          size='medium'
          color='primary'
          aria-label='back'
          sx={{
            position: 'absolute',
            top: 25,
            right: 25,
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.05)',
            },
            color: '#000',
            boxShadow: 'none',
          }}
          onClick={() => navigate('/')}
        >
          <ChevronLeftIcon />
        </Fab>
        <Logo w={70} />
        <Typography variant='h4' component='h4' fontWeight={700}>
          Please sign in
        </Typography>

        {/* username */}
        <FormControl variant='outlined' fullWidth sx={{ my: 2 }}>
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
        <FormControl variant='outlined' fullWidth>
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

        <Typography
          variant='subtitle'
          component='p'
          color='primary.main'
          textAlign='right'
          fontWeight={600}
          mt={1}
          mb={1.5}
          sx={{ cursor: 'pointer' }}
        >
          Forget Password?
        </Typography>

        <Button variant='contained'>Sign In</Button>

        <Typography
          variant='subtitle'
          component='span'
          color='text.primary'
          textAlign='right'
          fontWeight={500}
          mt={1.5}
        >
          Don't have an account?{' '}
          <Typography
            variant='subtitle'
            component='span'
            color='primary.main'
            textAlign='right'
            fontWeight={500}
            mt={2}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Typography>
        </Typography>
      </Paper>
    </LogInContainer>
  );
};
export default LogInPage;
