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

import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TablePaginationActions from '../../../components/attendance/TablePaginationActions';
import {
  fetchAllSummaryAttendance,
  getAllSummary,
  getAllSummaryCSV,
} from '../../../features/attendances/attendancesSlice';

const AdminSummary = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [sortedNames, setSortedName] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const get_all_summary = useSelector(getAllSummary);
  const get_all_csv = useSelector(getAllSummaryCSV);

  useEffect(() => {
    dispatch(fetchAllSummaryAttendance());
  }, [dispatch]);

  // handle members
  useEffect(() => {
    setSortedName(get_all_summary);
  }, [get_all_summary]);

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

  // handle sort by name
  const handleSortByName = () => {
    if (order === 'asc') {
      const users = [...get_all_summary];
      const orderedNames = users?.sort((a, b) =>
        b?.name.localeCompare(a?.name)
      );
      setSortedName(orderedNames);
      setOrder('desc');
    } else if (order === 'desc') {
      const users = [...get_all_summary];
      const orderedNames = users?.sort((a, b) =>
        a?.name.localeCompare(b?.name)
      );
      setSortedName(orderedNames);
      setOrder('asc');
    }
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
              onClick={() => FileDownload(get_all_csv, `attendance report.csv`)}
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
export default AdminSummary;
