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
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../../lib/authContext';
import {
  getMembers,
  getRoomInfo,
  searchUser,
} from '../../features/companies/companiesSlice';

import RoomLayout from '../../layout/RoomLayout';
import {
  StyledContainer,
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
} from '../../components/global';
import avatarTheme from '../../lib/avatar';

const Member = () => {
  const [type, setType] = useState('All');
  const [searchKey, setSearchKey] = useState('');
  const [auth, setAuth] = useState(false);
  const { _user, _isUserAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const dispatch = useDispatch();
  const members = useSelector(getMembers);

  useEffect(() => {
    dispatch(getRoomInfo(room_id)).unwrap();
  }, [room_id, dispatch]);

  useEffect(() => {
    if (!_isUserAuth) {
      navigate('/login');
    }
  }, [_isUserAuth, navigate]);

  useEffect(() => {
    if (auth) {
      if (_user?.employeeInfo?.listOfCompanies?.length > 0) {
        const res = _user?.employeeInfo?.listOfCompanies?.some(
          (e) => e.company_id === room_id
        );

        if (!res) navigate('/room');
      } else if (_user?.internInfo?.companyInfo?.company_id) {
        if (_user?.internInfo?.companyInfo?.company_id !== room_id) {
          navigate('/room');
        }
      }
    } else {
      setAuth(true);
    }
  }, [
    auth,
    _user?.internInfo?.companyInfo?.company_id,
    _user?.employeeInfo?.listOfCompanies,
    room_id,
    navigate,
  ]);

  const handleChange = async ({ target }) => {
    setType(target.value);

    // fetch here
    dispatch(searchUser({ keyword: searchKey, type: target.value, room_id }));
  };

  // handle event key
  const handleKeyDown = (event) => {
    if (event.code === 'Enter' || (event.shiftKey && event.code === 'Enter')) {
      // fetch here
      dispatch(searchUser({ keyword: searchKey, type, room_id }));
    }
  };

  // handle click button
  const handleOnClick = () => {
    // fetch here
    dispatch(searchUser({ keyword: searchKey, type, room_id }));
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
              <MenuItem value='Owner'>Owner</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>

        {/* list of members */}
        {members?.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table aria-label='simple table'>
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
                {members?.map((row) => (
                  <TableRow hover key={row?._id}>
                    <TableCell align='left'>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: avatarTheme({
                            name: row?.name?.[0]?.toLowerCase(),
                          }),
                        }}
                      >
                        {row?.name?.[0]}
                      </Avatar>
                    </TableCell>
                    <TableCell align='left' padding='none'>
                      {row?.name}
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {row?.roles}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
    </RoomLayout>
  );
};
export default Member;
