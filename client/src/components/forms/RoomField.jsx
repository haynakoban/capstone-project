import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

const isValidUsername = (username) =>
  // validate weather the username begin with latter
  /[a-zA-Z]/.test(username);

const RoomField = ({ errors, name, label, minlen, register, watch }) => {
  const handleValidation = async (roomname) => {
    if (isValidUsername(roomname[0])) {
      return true;
    } else {
      return 'room name must begin with a letter';
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
            message: `Room name must at least ${minlen} characters`,
          },
          validate: handleValidation,
        })}
      />
      <FormHelperText id={label}>{errors && errors}</FormHelperText>
    </FormControl>
  );
};
export default RoomField;
