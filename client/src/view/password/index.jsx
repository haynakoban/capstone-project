import { Button, Fab, Paper, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useNavigate } from 'react-router-dom';

import LogInContainer from '../../components/global/LogInContainer';
import Logo from '../../layout/MainLayout/Header/Logo';
import EmailField from '../../components/forms/EmailField';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const handleFormSubmit = (data) => {
    console.log(data);
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
            sm: 420,
            md: 420,
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
        <Typography variant='h5' component='h5' fontWeight={700} my={2}>
          Forgot Password
        </Typography>

        {/* email otp */}
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
          Send OTP
        </Button>
      </Paper>
    </LogInContainer>
  );
};
export default ForgotPassword;
