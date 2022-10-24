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

import { useState } from 'react';
import TablePaginationActions from './TablePaginationActions';

import { summaryData } from './data';

const Summary = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - summaryData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
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
          Result: 10
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
                ? summaryData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : summaryData
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.summary}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.completed}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.remaining}
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
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={6}
                  count={summaryData.length}
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
export default Summary;
