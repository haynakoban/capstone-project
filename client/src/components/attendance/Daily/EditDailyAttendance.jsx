import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import moment from 'moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { StyledModalBoxAttendance } from '../../global';
import { updateDailyAttendance } from '../../../features/attendances/attendancesSlice';

const EditDailyAttendance = ({ intern, handleModalClose }) => {
  const dispatch = useDispatch();

  const { handleSubmit, register, watch, setValue } = useForm({
    defaultValues: {
      _id: intern?._id,
      name: intern?.name,
      attendance_date: intern?.attendance_date,
      in_time: intern?.in_time,
      out_time: moment(),
      status: intern?.status,
    },
  });

  const handleFormSubmit = (data) => {
    dispatch(updateDailyAttendance(data));

    handleModalClose();
  };

  return (
    <StyledModalBoxAttendance
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='body1' component='div' fontWeight={600} width='100%'>
        Edit Daily Attendance
      </Typography>

      {/* intern attendance */}
      <Divider flexItem sx={{ bgcolor: '#202128', height: '1px', mt: 1 }} />

      <Box width='100%' mt={2} display='flex' justifyContent='space-between'>
        <Typography variant='body1' component='div' fontWeight={700}>
          {watch('name')}
        </Typography>
        <Typography variant='body1' component='div' fontWeight={700}>
          {watch('attendance_date')}
        </Typography>
      </Box>

      {/* in time */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label='In Time'
          value={watch('in_time')}
          onChange={(date) => {
            setValue('in_time', date);
          }}
          renderInput={(params) => (
            <TextField {...params} fullWidth sx={{ mt: 2.5 }} />
          )}
        />
      </LocalizationProvider>

      {/* out time */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label='Out Time'
          value={watch('out_time')}
          onChange={(date) => {
            setValue('out_time', date);
          }}
          renderInput={(params) => (
            <TextField {...params} fullWidth sx={{ mt: 3 }} />
          )}
        />
      </LocalizationProvider>

      {/* status */}

      <FormControl sx={{ mt: 3 }} required fullWidth>
        <InputLabel id='Status'>Status</InputLabel>
        <Select
          labelId='Status'
          id='Status'
          label='Status'
          value={watch('status')}
          {...register('status')}
        >
          <MenuItem value='Present'>Present</MenuItem>
          <MenuItem value='Absent'>Absent</MenuItem>
        </Select>
      </FormControl>

      <Divider flexItem sx={{ bgcolor: '#202128', height: '1px', mt: 3 }} />

      {/* save button */}
      <Box
        display='flex'
        justifyContent='flex-end'
        alignItems='center'
        mt={2}
        px={2}
        width='100%'
      >
        <Button variant='outlined' onClick={handleModalClose} sx={{ mx: 1 }}>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleSubmit(handleFormSubmit)}
          type='submit'
          sx={{ mx: 1 }}
        >
          Save
        </Button>
      </Box>
    </StyledModalBoxAttendance>
  );
};
export default EditDailyAttendance;
