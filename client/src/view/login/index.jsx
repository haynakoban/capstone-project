import {
  Button,
  Fab,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import axios from '../../lib/axiosConfig';
import Logo from '../../layout/Header/Logo';

import LogInContainer from '../../components/global/LogInContainer';

const maxAge = 7 * 24 * 60 * 60;

const LogInPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [cookies, setCookie] = useCookies(['uid']);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (data) => {
    const { username, password } = data;

    const res = await axios.post('api/users/auth/_log', { username, password });

    if (res.data?.err) {
      setError(res.data?.err);
    } else {
      setError('');
      setCookie('uid', res.data?.token, {
        path: '/',
        maxAge,
        sameSite: 'strict',
      });
    }
  };

  return (
    <LogInContainer>
      {cookies.uid ? (
        <Navigate to='/' />
      ) : (
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

          {error && (
            <Typography
              variant='p'
              component='p'
              sx={{ mt: 0.5, color: '#d32f2f' }}
            >
              {error}
            </Typography>
          )}

          {/* username */}
          <FormControl
            variant='outlined'
            fullWidth
            sx={{ my: 2 }}
            required
            {...(error && { error: true })}
          >
            <InputLabel htmlFor='username'>Username</InputLabel>
            <OutlinedInput
              autoComplete='off'
              id='username'
              type='text'
              label='Username'
              value={watch('username')}
              {...register('username')}
            />
          </FormControl>

          {/* password */}
          <FormControl
            variant='outlined'
            fullWidth
            required
            {...(error && { error: true })}
          >
            <InputLabel htmlFor='password'>Password</InputLabel>
            <OutlinedInput
              autoComplete='off'
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={watch('password')}
              {...register('password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
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

          <Button variant='contained' onClick={handleSubmit(handleFormSubmit)}>
            Sign In
          </Button>

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
      )}
    </LogInContainer>
  );
};
export default LogInPage;
