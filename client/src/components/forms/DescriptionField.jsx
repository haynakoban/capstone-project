import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

const DescriptionField = ({ name, label, message, register, watch }) => {
  return (
    <FormControl variant='outlined' fullWidth sx={{ mb: 2 }}>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <OutlinedInput
        multiline
        rows={5}
        autoComplete='off'
        id={label}
        type='text'
        label={label}
        value={watch(name)}
        {...register(name)}
      />
      <FormHelperText id={label}>{message}</FormHelperText>
    </FormControl>
  );
};
export default DescriptionField;
