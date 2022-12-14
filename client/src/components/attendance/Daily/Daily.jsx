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

import FileDownload from 'js-file-download';
import jsPDF from 'jspdf';

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
  fetchMyDailyAttendance,
  generateAttendances,
  getDailyAttendances,
  getDailyCSV,
  getMyDailyAttendances,
  getMyDailyPDF,
} from '../../../features/attendances/attendancesSlice';
import {
  getMembers,
  getRoomInfo,
} from '../../../features/companies/companiesSlice';
import { createLog } from '../../../features/logs/logsSlice';

const Daily = ({ company_id }) => {
  const { _user } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [sortedNames, setSortedName] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const get_daily_attendances = useSelector(getDailyAttendances);
  const get_daily = useSelector(getMyDailyAttendances);
  const get_csv = useSelector(getDailyCSV);
  const get_my_pdf = useSelector(getMyDailyPDF);
  const members = useSelector(getMembers);

  const { watch, setValue, getValues } = useForm({
    defaultValues: {
      company_id,
      attendance_date: moment(),
    },
  });

  // fetch room info
  useEffect(() => {
    if (company_id) dispatch(getRoomInfo(company_id)).unwrap();
  }, [company_id, dispatch]);

  // fetch daily attendance
  // check if user intern or company
  useEffect(() => {
    if (company_id) {
      if (_user?.internInfo?.companyInfo?.hasCompany) {
        dispatch(
          fetchMyDailyAttendance({
            company_id,
            attendance_date: DailyAttendanceDateFormatter(
              getValues('attendance_date')
            ),
            user_id: _user?._id,
          })
        );
      } else {
        dispatch(
          fetchDailyAttendance({
            id: company_id,
            attendance_date: DailyAttendanceDateFormatter(
              getValues('attendance_date')
            ),
          })
        );
      }
    }
  }, [
    _user?._id,
    _user?.internInfo?.companyInfo?.hasCompany,
    dispatch,
    company_id,
    getValues,
  ]);

  // handle members
  useEffect(() => {
    if (_user?.internInfo?.companyInfo?.hasCompany && get_daily?.[0]?._id) {
      setSortedName(get_daily);
    } else {
      setSortedName(get_daily_attendances);
    }
  }, [
    _user?.internInfo?.companyInfo?.hasCompany,
    get_daily,
    get_daily_attendances,
  ]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedNames?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // handle when date change
  const handleFormSubmit = (company_id, date, user_id) => {
    if (_user?.internInfo?.companyInfo?.hasCompany) {
      dispatch(
        fetchMyDailyAttendance({
          company_id,
          attendance_date: DailyAttendanceDateFormatter(date),
          user_id,
        })
      );
    } else {
      dispatch(
        fetchDailyAttendance({
          id: company_id,
          attendance_date: DailyAttendanceDateFormatter(date),
        })
      );
    }
  };

  // handle sort by name
  const handleSortByName = () => {
    if (_user?.employeeInfo) {
      if (order === 'asc') {
        const users = [...get_daily_attendances];

        const orderedNames = users?.sort((a, b) =>
          b?.name.localeCompare(a?.name)
        );

        setSortedName(orderedNames);
        setOrder('desc');
      } else if (order === 'desc') {
        const users = [...get_daily_attendances];

        const orderedNames = users?.sort((a, b) =>
          a?.name.localeCompare(b?.name)
        );

        setSortedName(orderedNames);
        setOrder('asc');
      }
    }
  };

  const handleGenerateAttendance = () => {
    // filter the member
    const listOfMembers = members?.filter((e) => e?.roles === 'member');

    // filter the member who don't have attendance
    const filterMembers = listOfMembers?.filter((e) => {
      return !get_daily_attendances?.some((u) => u?.name === e?.name) && e;
    });

    dispatch(
      generateAttendances({
        users: filterMembers,
        company_id,
        attendance_date: DailyAttendanceDateFormatter(
          getValues('attendance_date')
        ),
      })
    );
  };

  // pdf
  const pdf = () => {
    const doc = new jsPDF();
    doc.text(`${get_my_pdf?.pdf}`, 10, 10);
    doc.save(`${get_my_pdf?.day}.pdf`);
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
              handleFormSubmit(company_id, date, _user?._id);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        {/* generate attendance  */}
        {_user?.employeeInfo && (
          <Button
            variant='contained'
            color='success'
            onClick={handleGenerateAttendance}
          >
            Generate Attendance
          </Button>
        )}
      </Toolbar>

      <Divider
        flexItem
        sx={{ bgcolor: '#202128', height: '1px', mt: { xs: 1.5, sm: 0 } }}
        variant='middle'
      />

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
                const date = new Date();

                // create log
                if (_user?.isIntern) {
                  dispatch(
                    createLog({
                      user_id: _user?._id,
                      report_date: DailyAttendanceDateFormatter(date),
                      time: TimeFormatter(date),
                      user_type: 'Intern',
                      log: `Downloaded daily attendance (${get_my_pdf?.day})`,
                    })
                  );
                } else {
                  dispatch(
                    createLog({
                      user_id: _user?._id,
                      report_date: DailyAttendanceDateFormatter(date),
                      time: TimeFormatter(date),
                      user_type: 'Employee',
                      log: `Downloaded daily attendance (${get_csv?.day})`,
                    })
                  );
                }

                if (_user?.internInfo?.companyInfo?.hasCompany) {
                  pdf();
                } else {
                  FileDownload(get_csv?.csv, `${get_csv?.day}.csv`);
                }
              }}
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
                        active={false}
                        direction={order}
                        onClick={handleSortByName}
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
                    ? sortedNames?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : sortedNames
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
                      {...(sortedNames?.length > 0 && {
                        count: sortedNames.length,
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
