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
import jsPDF from 'jspdf';

import moment from 'moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import MonthlyRow from './MonthlyRow';
import { MonthlyAttendanceDateFormatter } from '../../../lib/DateFormatter';
import {
  fetchMonthlyAttendance,
  fetchMyMonthlyAttendance,
  getMonthlyAttendances,
  getMonthlyCSV,
  getMyMonthlyPDF,
  getMyMonthlyAttendances,
} from '../../../features/attendances/attendancesSlice';
import { AuthContext } from '../../../lib/authContext';

const Monthly = ({ company_id }) => {
  const { _user } = useContext(AuthContext);
  const [order, setOrder] = useState('asc');
  const [sortedNames, setSortedName] = useState([]);

  const dispatch = useDispatch();
  const get_monthly_attendances = useSelector(getMonthlyAttendances);
  const get_monthly = useSelector(getMyMonthlyAttendances);
  const get_csv = useSelector(getMonthlyCSV);
  const get_my_pdf = useSelector(getMyMonthlyPDF);

  const { watch, setValue, getValues } = useForm({
    defaultValues: {
      company_id,
      attendance_date: moment(),
    },
  });

  // fetch monthly attendance
  // check if user intern or company
  useEffect(() => {
    if (company_id) {
      if (_user?.internInfo?.companyInfo?.hasCompany) {
        dispatch(
          fetchMyMonthlyAttendance({
            company_id,
            attendance_date: MonthlyAttendanceDateFormatter(
              getValues('attendance_date')
            ),
            user_id: _user?._id,
          })
        );
      } else {
        dispatch(
          fetchMonthlyAttendance({
            company_id,
            attendance_date: MonthlyAttendanceDateFormatter(
              getValues('attendance_date')
            ),
          })
        );
      }
    }
  }, [
    _user?.internInfo?.companyInfo?.hasCompany,
    _user?._id,
    dispatch,
    company_id,
    getValues,
  ]);

  // handle members
  useEffect(() => {
    if (_user?.internInfo?.companyInfo?.hasCompany && get_monthly?.[0]?._id) {
      setSortedName(get_monthly);
    } else {
      setSortedName(get_monthly_attendances);
    }
  }, [
    _user?.internInfo?.companyInfo?.hasCompany,
    get_monthly_attendances,
    get_monthly,
  ]);

  // handle change month
  const handleOnChangeMonth = (date) => {
    if (company_id) {
      if (_user?.internInfo?.companyInfo?.hasCompany) {
        dispatch(
          fetchMyMonthlyAttendance({
            company_id,
            attendance_date: MonthlyAttendanceDateFormatter(date),
            user_id: _user?._id,
          })
        );
      } else {
        dispatch(
          fetchMonthlyAttendance({
            company_id,
            attendance_date: MonthlyAttendanceDateFormatter(date),
          })
        );
      }
    }
  };

  // handle sort by name
  const handleSortByName = () => {
    if (_user?.employeeInfo) {
      if (order === 'asc') {
        const users = [...get_monthly_attendances];

        const orderedNames = users?.sort((a, b) =>
          b?.name.localeCompare(a?.name)
        );

        setSortedName(orderedNames);
        setOrder('desc');
      } else if (order === 'desc') {
        const users = [...get_monthly_attendances];

        const orderedNames = users?.sort((a, b) =>
          a?.name.localeCompare(b?.name)
        );

        setSortedName(orderedNames);
        setOrder('asc');
      }
    }
  };

  // pdf
  const pdf = () => {
    const doc = new jsPDF();
    doc.text(`${get_my_pdf?.pdf}`, 10, 10);
    doc.save(`${get_my_pdf?.month}.pdf`);
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
              onClick={() => {
                if (_user?.internInfo?.companyInfo?.hasCompany) {
                  pdf();
                } else {
                  FileDownload(get_csv?.csv, `${get_csv?.month}.csv`);
                }
              }}
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
export default Monthly;
