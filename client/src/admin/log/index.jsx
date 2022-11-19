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
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';

import moment from 'moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import TablePaginationActions from '../../components/attendance/TablePaginationActions';

import {
  SearchContainer,
  SearchIconWrapper,
  StyledContainer,
  StyledInputBase,
} from '../../components/global';

import AdminLayout from '../../layout/AdminLayout';
import { row } from './data';

const AdminLogReportsPage = () => {
  const [searchKey, setSearchKey] = useState('');
  const [order, setOrder] = useState('asc');
  const [sortedNames, setSortedName] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();

  const { watch, setValue, getValues } = useForm({
    defaultValues: {
      attendance_date: moment(),
    },
  });

  // handle logs
  useEffect(() => {
    setSortedName(row);
  }, []);

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

  // handle event key
  const handleKeyDown = (event) => {
    if (event.code === 'Enter' || (event.shiftKey && event.code === 'Enter')) {
      // fetch here
      // dispatch(searchUsers({ keyword: searchKey, type: true }));
    }
  };

  // handle click button
  const handleOnClick = () => {
    // fetch here
    // dispatch(searchUsers({ keyword: searchKey, type: true }));
  };

  // handle sort by name
  const handleSortByName = () => {
    // if (order === 'asc') {
    //   const users = [...interns];
    //   const orderedNames = users?.sort((a, b) =>
    //     b?.name.localeCompare(a?.name)
    //   );
    //   setSortedName(orderedNames);
    //   setOrder('desc');
    // } else if (order === 'desc') {
    //   const users = [...interns];
    //   const orderedNames = users?.sort((a, b) =>
    //     a?.name.localeCompare(b?.name)
    //   );
    //   setSortedName(orderedNames);
    //   setOrder('asc');
    // }
  };

  return (
    <AdminLayout>
      <StyledContainer width='lg'>
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
                // handleFormSubmit(date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          {/* search  */}
          <SearchContainer sx={{ mt: { xs: 2, sm: 0 } }}>
            <SearchIconWrapper
              disableRipple
              size='small'
              onClick={handleOnClick}
            >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </SearchContainer>
        </Toolbar>

        {/* list of users */}
        {sortedNames?.length > 0 ? (
          <Fragment>
            <Divider
              flexItem
              sx={{ bgcolor: '#202128', height: '1px', mt: { xs: 1.5, sm: 0 } }}
              variant='middle'
            />

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
                // onClick={() =>
                //   FileDownload(get_all_csv?.csv, `${get_all_csv?.day}.csv`)
                // }
              >
                Download
              </Button>
            </Toolbar>

            {/* log reports sheet */}
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
                        Date
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        Time
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        Type
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        Log
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        IP Address
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
                      // change the row?.name to row?._id
                      <TableRow key={row?.name}>
                        <TableCell component='th' scope='row'>
                          {row?.name ?? '-'}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row?.date ?? '-'}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row?.time ?? '-'}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row?.type ?? '-'}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row?.log ?? '-'}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row?.ip ?? '-'}
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
        ) : (
          <Typography
            variant='h6'
            component='p'
            width='100%'
            mt={{ xs: 3, sm: 5 }}
            textAlign='center'
          >
            No results matched your search.
          </Typography>
        )}
      </StyledContainer>
    </AdminLayout>
  );
};
export default AdminLogReportsPage;
