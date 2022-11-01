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

import axios from '../../lib/axiosConfig';

const isValidPassword = (password) =>
  // validate if password contain the following
  // a lowercase and uppercase letter
  // a number and special character
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/.test(
    password
  );

const OldPassword = ({
  errors,
  name,
  label,
  register,
  watch,
  minlen,
  maxlen,
  showPassword,
  handleShowPassword,
  id,
}) => {
  const handlePasswordValidation = async (password, id) => {
    const result = await axios.post('api/users/validation/password', {
      id,
      password,
    });

    const isValid = isValidPassword(password);

    const validityChanged = (errors && isValid) || (!errors && isValid);

    if (!(validityChanged && isValid)) {
      return 'password must contain at least one lowercase letter, capital letter, number, and special character';
    } else if (result?.data?.err) {
      return 'incorrect password';
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
          validate: (password) => handlePasswordValidation(password, id),
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
export default OldPassword;
