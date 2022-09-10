import {
  Avatar,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { StyledContainer } from '../../components/global/StyledContainer';
import {
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
} from '../../components/global/Search';
import { rows } from '../member/data';
import { useState } from 'react';

import RoomLayout from '../../layout/RoomLayout';

const Member = () => {
  const [type, setType] = useState('');

  const handleChange = ({ target }) => {
    setType(target.value);
  };

  return (
    <RoomLayout>
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
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchContainer>

          {/* filter */}
          <FormControl
            sx={{
              mr: '8px',
              mt: {
                xs: 2,
                sm: 0,
              },
              minWidth: {
                xs: '100%',
                sm: 140,
              },
            }}
            size='small'
          >
            <InputLabel id='demo-select-small'>Role</InputLabel>
            <Select
              labelId='demo-select-small'
              id='demo-select-small'
              value={type}
              label='Role'
              onChange={handleChange}
            >
              <MenuItem value='All'>All</MenuItem>
              <MenuItem value='Intern'>Intern</MenuItem>
              <MenuItem value='Employee'>Employee</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>

        {/* list of members */}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' padding='checkbox'>
                  <IconButton disabled></IconButton>
                </TableCell>
                <TableCell align='left' padding='none'>
                  <TableSortLabel
                  // active={orderBy === headCell.id}
                  // direction={orderBy === headCell.id ? order : 'asc'}
                  // onClick={createSortHandler(headCell.id)}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell align='right'>Roles</TableCell>
              </TableRow>
            </TableHead>

            {/* body */}
            <TableBody>
              {rows.map((row) => (
                <TableRow hover key={row?.name}>
                  <TableCell align='left'>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {row?.name[0]}
                    </Avatar>
                  </TableCell>
                  <TableCell align='left' padding='none'>
                    {row?.name}
                  </TableCell>
                  <TableCell align='right'>{row?.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledContainer>
    </RoomLayout>
  );
};
export default Member;
