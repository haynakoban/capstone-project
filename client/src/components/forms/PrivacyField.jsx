import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

const PrivacyField = ({ name, label, register, watch }) => {
  return (
    <FormControl sx={{ m: 1 }} required>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId={label}
        id={label}
        label={label}
        value={watch(name)}
        {...register(name)}
      >
        <MenuItem value={false}>Private</MenuItem>
        <MenuItem value={true}>Public</MenuItem>
      </Select>
      <FormHelperText id={label}>
        This allow you to keep the room private. if you wish to show it the
        public. Select the public.
      </FormHelperText>
    </FormControl>
  );
};
export default PrivacyField;
