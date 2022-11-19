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
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import FileDownload from 'js-file-download';

import moment from 'moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import MonthlyRow from '../../../components/attendance/monthly/MonthlyRow';
import { MonthlyAttendanceDateFormatter } from '../../../lib/DateFormatter';
import {
  fetchAllMonthlyAttendance,
  getAllMonthly,
  getAllMonthlyCSV,
} from '../../../features/attendances/attendancesSlice';

const AdminMonthly = () => {
  const [order, setOrder] = useState('asc');
  const [sortedNames, setSortedName] = useState([]);

  const dispatch = useDispatch();
  const get_all_monthly = useSelector(getAllMonthly);
  const get_all_csv = useSelector(getAllMonthlyCSV);

  const { watch, setValue, getValues } = useForm({
    defaultValues: {
      attendance_date: moment(),
    },
  });

  useEffect(() => {
    dispatch(
      fetchAllMonthlyAttendance({
        attendance_date: MonthlyAttendanceDateFormatter(
          getValues('attendance_date')
        ),
      })
    );
  }, [dispatch, getValues]);

  // handle members
  useEffect(() => {
    setSortedName(get_all_monthly);
  }, [get_all_monthly]);

  // handle change month
  const handleOnChangeMonth = (date) => {
    dispatch(
      fetchAllMonthlyAttendance({
        attendance_date: MonthlyAttendanceDateFormatter(date),
      })
    );
  };

  // handle sort by name
  const handleSortByName = () => {
    if (order === 'asc') {
      const users = [...get_all_monthly];
      const orderedNames = users?.sort((a, b) =>
        b?.name.localeCompare(a?.name)
      );
      setSortedName(orderedNames);
      setOrder('desc');
    } else if (order === 'desc') {
      const users = [...get_all_monthly];
      const orderedNames = users?.sort((a, b) =>
        a?.name.localeCompare(b?.name)
      );
      setSortedName(orderedNames);
      setOrder('asc');
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

      {sortedNames?.length > 0 && (
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
              Result: {sortedNames?.length}
            </Typography>
            <Button
              color='success'
              variant='contained'
              startIcon={<DownloadIcon />}
              sx={{
                textTransform: 'capitalize',
              }}
              onClick={() =>
                FileDownload(get_all_csv?.csv, `${get_all_csv?.month}.csv`)
              }
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
                      <TableSortLabel
                        active={false}
                        direction={order}
                        onClick={handleSortByName}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      Summary
                    </TableCell>
                    <TableCell align='right' />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedNames?.map((row) => (
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
export default AdminMonthly;
