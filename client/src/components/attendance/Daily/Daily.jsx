import {
  Box,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import TablePaginationActions from '../TablePaginationActions';
import DailyModal from './DailyModal';
import { AuthContext } from '../../../lib/authContext';
import {
  DailyAttendanceDateFormatter,
  TimeFormatter,
} from '../../../lib/DateFormatter';
import {
  fetchDailyAttendance,
  getDailyAttendances,
} from '../../../features/attendances/attendancesSlice';

const Daily = ({ company_id }) => {
  const { _user } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const get_daily_attendances = useSelector(getDailyAttendances);

  const { watch, setValue, getValues } = useForm({
    defaultValues: {
      company_id,
      attendance_date: moment(),
    },
  });

  useEffect(() => {
    if (company_id) {
      dispatch(
        fetchDailyAttendance({
          id: company_id,
          attendance_date: DailyAttendanceDateFormatter(
            getValues('attendance_date')
          ),
        })
      );
    }
  }, [dispatch, company_id, getValues]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - get_daily_attendances?.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFormSubmit = (company_id, date) => {
    dispatch(
      fetchDailyAttendance({
        id: company_id,
        attendance_date: DailyAttendanceDateFormatter(date),
      })
    );
  };

  return (
    <Box>
      {/* calendar */}
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
              handleFormSubmit(company_id, date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Toolbar>

      <Divider
        flexItem
        sx={{ bgcolor: '#202128', height: '1px', mt: { xs: 1.5, sm: 0 } }}
        variant='middle'
      />

      {get_daily_attendances?.length > 0 && (
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
              Result: {get_daily_attendances?.length}
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
              <Table
                sx={{ minWidth: 500 }}
                aria-label='custom pagination table'
              >
                <TableHead>
                  <TableRow sx={{ '& > th': { fontWeight: 600 } }}>
                    <TableCell component='th' scope='row'>
                      <TableSortLabel
                      // active={orderBy === headCell.id}
                      // direction={orderBy === headCell.id ? order : 'asc'}
                      // onClick={createSortHandler(headCell.id)}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      Attendance Date
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      In Time
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      Out Time
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      Status
                    </TableCell>
                    {_user?.employeeInfo && (
                      <TableCell component='th' scope='row'>
                        Action
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? get_daily_attendances?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : get_daily_attendances
                  )?.map((row) => (
                    <TableRow key={row?._id}>
                      <TableCell component='th' scope='row'>
                        {row?.name}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {row?.attendance_date}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {row?.in_time ? TimeFormatter(row?.in_time) : '00:00'}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {row?.out_time ? TimeFormatter(row?.out_time) : '00:00'}
                      </TableCell>
                      {row?.status === 'Absent' ? (
                        <TableCell
                          component='th'
                          scope='row'
                          sx={{ color: '#DF4759', fontWeight: 700 }}
                        >
                          {row?.status}
                        </TableCell>
                      ) : (
                        <TableCell
                          component='th'
                          scope='row'
                          sx={{
                            color: '#0d6efd',
                            fontStyle: 'italic',
                            fontWeight: 700,
                          }}
                        >
                          {row?.status}
                        </TableCell>
                      )}

                      {_user?.employeeInfo && (
                        <TableCell component='th' scope='row'>
                          <DailyModal intern={row} />
                        </TableCell>
                      )}
                    </TableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      sx={{
                        '& > div > p': {
                          mb: '0px !important',
                        },
                      }}
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: 'All', value: -1 },
                      ]}
                      colSpan={6}
                      {...(get_daily_attendances?.length > 0 && {
                        count: get_daily_attendances.length,
                      })}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};
export default Daily;
