import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import moment from 'moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import MonthlyRow from './MonthlyRow';
import { MonthlyAttendanceDateFormatter } from '../../../lib/DateFormatter';
import {
  fetchMonthlyAttendance,
  getMonthlyAttendances,
} from '../../../features/attendances/attendancesSlice';

const Monthly = ({ company_id }) => {
  const dispatch = useDispatch();
  const get_monthly_attendances = useSelector(getMonthlyAttendances);

  const { watch, setValue, getValues } = useForm({
    defaultValues: {
      company_id,
      attendance_date: moment(),
    },
  });

  useEffect(() => {
    if (company_id) {
      dispatch(
        fetchMonthlyAttendance({
          company_id,
          attendance_date: MonthlyAttendanceDateFormatter(
            getValues('attendance_date')
          ),
        })
      );
    }
  }, [dispatch, company_id, getValues]);

  // handle change month
  const handleOnChangeMonth = (date) => {
    if (company_id) {
      dispatch(
        fetchMonthlyAttendance({
          company_id,
          attendance_date: MonthlyAttendanceDateFormatter(date),
        })
      );
    }
  };

  return (
    <Box>
      {/* search and download */}
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          p: { xs: 0, sm: 2 },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='Choose Date'
            value={watch('attendance_date')}
            onChange={(date) => {
              setValue('attendance_date', date);

              handleOnChangeMonth(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Toolbar>

      {get_monthly_attendances?.length > 0 && (
        <Fragment>
          {/* result and download */}
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: { xs: 0, sm: 2 },
            }}
          >
            <Typography variant='body1' fontWeight={600}>
              Result: {get_monthly_attendances?.length}
            </Typography>
            <Button
              color='success'
              variant='contained'
              startIcon={<DownloadIcon />}
              sx={{
                textTransform: 'capitalize',
              }}
              onClick={() => console.log('download result')}
            >
              Download
            </Button>
          </Toolbar>

          {/* attendance sheet */}
          <Box mt={2}>
            <TableContainer component={Paper}>
              <Table aria-label='collapsible table'>
                <TableHead>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Name
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      Summary
                    </TableCell>
                    <TableCell align='right' />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {get_monthly_attendances?.map((row) => (
                    <MonthlyRow key={row?._id} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};
export default Monthly;
