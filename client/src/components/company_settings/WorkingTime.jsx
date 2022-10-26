import {
  Box,
  Paper,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

import moment from 'moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { toggleStartAndEndTime } from '../../features/companies/companiesSlice';

const WorkingTime = ({
  company_id,
  isOn,
  start_time = moment(),
  end_time = moment(),
}) => {
  const [checked, setChecked] = useState(isOn);

  const dispatch = useDispatch();

  const { watch, setValue, getValues } = useForm({
    defaultValues: {
      company_id,
      start_time,
      end_time,
    },
  });

  //   handle change for start time
  const handleChange = (event) => {
    setChecked(event.target.checked);

    dispatch(
      toggleStartAndEndTime({
        id: getValues('company_id'),
        start_time: getValues('start_time'),
        end_time: getValues('end_time'),
        isOn: event.target.checked,
      })
    );
  };

  //   handle start time if switch is on
  const handleStartTime = (startTimeChecked, date) => {
    if (startTimeChecked) {
      dispatch(
        toggleStartAndEndTime({
          id: getValues('company_id'),
          start_time: date,
          isOn: startTimeChecked,
        })
      );
    }
  };

  //   handle end time if switch is on
  const handleEndTime = (endTimeChecked, date) => {
    if (endTimeChecked) {
      dispatch(
        toggleStartAndEndTime({
          id: getValues('company_id'),
          end_time: date,
          isOn: endTimeChecked,
        })
      );
    }
  };

  return (
    <Box>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Toolbar>

      <Paper
        elevation={0}
        sx={{
          border: '0.5px solid #20212850',
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'center', sm: 'center' },
          alignItems: { xs: 'center' },
        }}
      >
        <Box
          flexGrow={1}
          px={{ xs: 0, sm: 3 }}
          width={{ xs: '100%', sm: 'auto' }}
        >
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Box>
              <Typography variant='body2'>
                Set up the start time for daily attendance,
              </Typography>
              <Typography variant='body2'>
                By default the start time option is off
              </Typography>
            </Box>
          </Box>

          {/* start time */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label='Start Time'
              value={watch('start_time')}
              onChange={(date) => {
                setValue('start_time', date);

                handleStartTime(checked, date);
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ mt: 2.5 }} fullWidth />
              )}
            />
          </LocalizationProvider>
        </Box>

        <Box
          flexGrow={1}
          px={{ xs: 0, sm: 3 }}
          mt={{ xs: 2, sm: 0 }}
          width={{ xs: '100%', sm: 'auto' }}
        >
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Box>
              <Typography variant='body2'>
                Set up the end time for daily attendance,
              </Typography>
              <Typography variant='body2'>
                By default the end time option is off
              </Typography>
            </Box>
          </Box>

          {/* end time */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label='End Time'
              value={watch('end_time')}
              onChange={(date) => {
                setValue('end_time', date);

                handleEndTime(isOn, date);
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ mt: 2.5 }} fullWidth />
              )}
            />
          </LocalizationProvider>
        </Box>
      </Paper>
    </Box>
  );
};
export default WorkingTime;
