import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import SearchIcon from '@mui/icons-material/Search';

import { Fragment, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../lib/authContext';

import MainLayout from '../../layout/MainLayout';
import {
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
} from '../../components/global';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, getRooms } from '../../features/companies/companiesSlice';
import CardInternship from '../../components/cards/CardInternship';

const InternshipList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { _isUserAuth, _user } = useContext(AuthContext);
  const getRoomsList = useSelector(getRooms);

  useEffect(() => {
    if (!_isUserAuth) {
      navigate('/login');
    }
    if (!_user?.isIntern) {
      navigate('/');
    }
  }, [_isUserAuth, _user?.isIntern, navigate]);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const RoomList = getRoomsList.map((room) => (
    <Grid item xs={4} sm={4} md={4} lg={6} key={room?._id}>
      <CardInternship room={room} />
    </Grid>
  ));

  return (
    <Fragment>
      <MainLayout />

      {/* content */}
      <Toolbar />
      <Container maxWidth='lg' sx={{ p: 1 }}>
        {/* search and filter */}
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchContainer>

          <IconButton sx={{ ml: 2 }}>
            <FilterListRoundedIcon />
          </IconButton>
        </Toolbar>

        <Divider sx={{ bgcolor: '#00000050' }} />

        {/* list of companies */}
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h5' component='h5'>
              Internship
            </Typography>
            <Typography variant='body1' component='p'>
              {getRoomsList.length} available internship
            </Typography>
          </Toolbar>

          <Grid
            container
            spacing={{ xs: 1, sm: 2, md: 3 }}
            columns={{ xs: 4, sm: 4, md: 8, lg: 12 }}
          >
            {RoomList}
          </Grid>
        </Box>
      </Container>
    </Fragment>
  );
};
export default InternshipList;
