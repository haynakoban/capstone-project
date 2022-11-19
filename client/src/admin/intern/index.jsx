import {
  Box,
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
import SearchIcon from '@mui/icons-material/Search';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TablePaginationActions from '../../components/attendance/TablePaginationActions';

import {
  SearchContainer,
  SearchIconWrapper,
  StyledContainer,
  StyledInputBase,
} from '../../components/global';
import AdminLayout from '../../layout/AdminLayout';
import {
  getInterns,
  getUsers,
  searchUsers,
} from '../../features/users/usersSlice';

const AdminInternPage = () => {
  const [searchKey, setSearchKey] = useState('');
  const [order, setOrder] = useState('asc');
  const [sortedNames, setSortedName] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const interns = useSelector(getInterns);

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

  useEffect(() => {
    dispatch(getUsers({ type: true }));
  }, [dispatch]);

  // handle interns
  useEffect(() => {
    setSortedName(interns);
  }, [interns]);

  // handle event key
  const handleKeyDown = (event) => {
    if (event.code === 'Enter' || (event.shiftKey && event.code === 'Enter')) {
      // fetch here
      dispatch(searchUsers({ keyword: searchKey, type: true }));
    }
  };

  // handle click button
  const handleOnClick = () => {
    // fetch here
    dispatch(searchUsers({ keyword: searchKey, type: true }));
  };

  // handle sort by name
  const handleSortByName = () => {
    if (order === 'asc') {
      const users = [...interns];
      const orderedNames = users?.sort((a, b) =>
        b?.name.localeCompare(a?.name)
      );
      setSortedName(orderedNames);
      setOrder('desc');
    } else if (order === 'desc') {
      const users = [...interns];
      const orderedNames = users?.sort((a, b) =>
        a?.name.localeCompare(b?.name)
      );
      setSortedName(orderedNames);
      setOrder('asc');
    }
  };

  return (
    <AdminLayout>
      <StyledContainer width='lg'>
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            justifyContent: 'space-between',
          }}
          disableGutters
        >
          {/* search  */}
          <SearchContainer>
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

        {/* list of interns */}
        {sortedNames?.length > 0 ? (
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
                      Userrname
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      Email
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      University
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      Course
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
                        {row?.username}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {row?.email}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {row?.internInfo?.school?.name ?? '-'}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {row?.internInfo?.school?.course ?? '-'}
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
export default AdminInternPage;
