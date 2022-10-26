import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Fragment, useState } from 'react';

const MonthlyRow = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        <TableCell component='th' scope='row'>
          {row?.name}
        </TableCell>
        <TableCell component='th' scope='row'>
          {row?.summary}
        </TableCell>
        <TableCell align='right'>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                {row?.month}
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Day
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.monthly.map((month) => (
                    <TableRow key={month?.day}>
                      <TableCell component='th' scope='row'>
                        {month?.day}
                      </TableCell>
                      {month?.status === 'Absent' ? (
                        <TableCell
                          component='th'
                          scope='row'
                          sx={{ color: '#DF4759', fontWeight: 700 }}
                        >
                          {month?.status}
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
                          {month?.status}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
export default MonthlyRow;
