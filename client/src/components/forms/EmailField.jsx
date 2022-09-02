import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

const isValidEmail = (email) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const EmailField = ({ errors, name, label, register, watch }) => {
  const handleEmailValidation = (email) => {
    const isValid = isValidEmail(email);

    const validityChanged = (errors && isValid) || (!errors && isValid);

    return validityChanged && isValid;
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
        type='email'
        label={label}
        value={watch(name)}
        {...register(name, {
          required: 'This field is required',
          validate: (email) =>
            handleEmailValidation(email) === true || 'Invalid email address',
        })}
      />
      <FormHelperText id={label}>{errors && errors}</FormHelperText>
    </FormControl>
  );
};
export default EmailField;
