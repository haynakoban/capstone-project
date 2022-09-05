import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import axios from '../../lib/axiosConfig';

const isValidUsername = (username) =>
  // validate weather the username begin with latter
  /[a-zA-Z]/.test(username);

const UsernameField = ({ errors, name, label, minlen, register, watch }) => {
  const handleValidation = async (username) => {
    const result = await axios.post('api/users/validation', {
      username,
    });

    if (result.data?.err) {
      return result.data?.err;
    } else if (isValidUsername(username[0])) {
      return true;
    } else {
      return 'username must begin with a letter';
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
        type='text'
        label={label}
        value={watch(name)}
        {...register(name, {
          required: 'This field is required',
          minLength: {
            value: minlen,
            message: `Username must at least ${minlen} characters`,
          },
          validate: handleValidation,
        })}
      />
      <FormHelperText id={label}>{errors && errors}</FormHelperText>
    </FormControl>
  );
};
export default UsernameField;
