import {
  Box,
  Button,
  // Paper,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  TextField,
  Toolbar,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import { useForm } from 'react-hook-form';

import moment from 'moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// import MonthlyRow from './MonthlyRow';
// import { monthlyRows } from './data';

const Monthly = () => {
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
        {/* <TableContainer component={Paper}>
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align='right'>Calories</TableCell>
                <TableCell align='right'>Fat&nbsp;(g)</TableCell>
                <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
                <TableCell align='right'>Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {monthlyRows.map((row) => (
                <MonthlyRow key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Box>
    </Box>
  );
};
export default Monthly;
