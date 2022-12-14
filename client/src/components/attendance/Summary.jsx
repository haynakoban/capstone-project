import {
  Box,
  Button,
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
  Toolbar,
  Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import FileDownload from 'js-file-download';
import jsPDF from 'jspdf';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TablePaginationActions from './TablePaginationActions';
import {
  fetchMySummaryAttendance,
  fetchSummaryAttendance,
  getMySummaryAttendances,
  getMySummaryPDF,
  getSummaryAttendances,
  getSummaryCSV,
} from '../../features/attendances/attendancesSlice';
import { AuthContext } from '../../lib/authContext';
import { createLog } from '../../features/logs/logsSlice';
import {
  DailyAttendanceDateFormatter,
  TimeFormatter,
} from '../../lib/DateFormatter';

const Summary = ({ company_id }) => {
  const { _user } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [sortedNames, setSortedName] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const get_summary_attendances = useSelector(getSummaryAttendances);
  const get_summary = useSelector(getMySummaryAttendances);
  const get_csv = useSelector(getSummaryCSV);
  const get_my_pdf = useSelector(getMySummaryPDF);

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

  // get summary attendance
  // check if user is intern or company
  useEffect(() => {
    if (_user?.internInfo?.companyInfo?.hasCompany) {
      dispatch(fetchMySummaryAttendance({ company_id, user_id: _user?._id }));
    } else {
      dispatch(fetchSummaryAttendance({ id: company_id }));
    }
  }, [
    _user?.internInfo?.companyInfo?.hasCompany,
    _user?._id,
    company_id,
    dispatch,
  ]);

  // handle members
  useEffect(() => {
    if (_user?.internInfo?.companyInfo?.hasCompany && get_summary?._id) {
      setSortedName([get_summary]);
    } else {
      setSortedName(get_summary_attendances);
    }
  }, [
    _user?.internInfo?.companyInfo?.hasCompany,
    get_summary,
    get_summary_attendances,
  ]);

  // handle sort by name
  const handleSortByName = () => {
    if (_user?.employeeInfo) {
      if (order === 'asc') {
        const users = [...get_summary_attendances];

        const orderedNames = users?.sort((a, b) =>
          b?.name.localeCompare(a?.name)
        );

        setSortedName(orderedNames);
        setOrder('desc');
      } else if (order === 'desc') {
        const users = [...get_summary_attendances];

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
    doc.text(`${get_my_pdf}`, 10, 10);
    doc.save(`attendance_summary.pdf`);
  };

  return (
    <Box>
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
                      log: `Downloaded summary of attendance`,
                    })
                  );
                } else {
                  dispatch(
                    createLog({
                      user_id: _user?._id,
                      report_date: DailyAttendanceDateFormatter(date),
                      time: TimeFormatter(date),
                      user_type: 'Employee',
                      log: `Downloaded summary of attendance`,
                    })
                  );
                }

                if (_user?.internInfo?.companyInfo?.hasCompany) {
                  pdf();
                } else {
                  FileDownload(get_csv, `attendance_summary.csv`);
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
                      Summary
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      Completed Hours
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      Remaining Hours
                    </TableCell>
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
                        {row?.summary_hours}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {row?.completed_hours}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {row?.remaining_hours}
                      </TableCell>
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
export default Summary;
