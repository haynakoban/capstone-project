import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ConfirmPassword = ({
  errors,
  name,
  label,
  register,
  watch,
  minlen,
  maxlen,
  showPassword,
  handleShowPassword,
  confirmPassword,
}) => {
  const handlePasswordValidation = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return 'Password does not match';
    }
  };

  return (
    <FormControl
      variant='outlined'
      fullWidth
      sx={{ mb: 2 }}
      required
      {...(errors && { error: true })}
    >
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <OutlinedInput
        autoComplete='off'
        id={label}
        type={showPassword ? 'text' : 'password'}
        label={label}
        value={watch(name)}
        {...register(name, {
          required: 'This field is required',
          minLength: {
            value: minlen,
            message: `password must at least ${minlen} characters`,
          },
          maxLength: {
            value: maxlen,
            message: `password must not exceed ${maxlen} characters`,
          },
          validate: (password) =>
            handlePasswordValidation(password, confirmPassword),
        })}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleShowPassword}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText id={label}>{errors && errors}</FormHelperText>
    </FormControl>
  );
};
export default ConfirmPassword;
