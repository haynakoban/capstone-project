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
  TextField,
  Toolbar,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import moment from 'moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import TablePaginationActions from './TablePaginationActions';
import { rows } from './data';

const Daily = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    // handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      company_id: '123',
      date: moment(),
    },
    mode: 'onBlur',
  });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleFormSubmit = (data) => {
  //   console.log(data);
  // };

  return (
    <Box>
      {/* calendar and download */}
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
            value={watch('date')}
            onChange={(date) => {
              setValue('date', date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Button
          color='success'
          variant='contained'
          startIcon={<DownloadIcon />}
          sx={{
            textTransform: 'capitalize',
            mt: { xs: 1, sm: 0 },
            alignSelf: { xs: 'flex-end', sm: 'center' },
          }}
          onClick={() => console.log('download result')}
        >
          Download
        </Button>
      </Toolbar>

      {/* attendance sheet */}
      <Box mt={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.attendance_date}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.in_time}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.out_time}
                  </TableCell>
                  {row.status === 'Absent' ? (
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{ color: '#DF4759', fontWeight: 700 }}
                    >
                      {row.status}
                    </TableCell>
                  ) : (
                    <TableCell component='th' scope='row'>
                      {row.status}
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
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={6}
                  count={rows.length}
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
    </Box>
  );
};
export default Daily;
