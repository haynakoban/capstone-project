import {
  Box,
  Container,
  Divider,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from '../../lib/axiosConfig';

import MainLayout from '../../layout/MainLayout';
import CardInternship from '../../components/cards/CardInternship';

import { AuthContext } from '../../lib/authContext';
import { fetchRooms, getRooms } from '../../features/companies/companiesSlice';
import {
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
} from '../../components/global';

const InternshipList = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchKeyError, setSearchKeyError] = useState(false);
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

  // handle event key
  const handleKeyDown = async (event) => {
    if (event.code === 'Enter' || (event.shiftKey && event.code === 'Enter')) {
      // fetch here
      const res = await axios.post('api/companies/search', {
        keyword: searchKey,
      });

      if (res.data?.rooms) {
        setSearchKeyError(false);
        setSearchResults(res.data?.rooms);
      } else if (res?.data?.msg) {
        setSearchKeyError(false);
        setSearchResults([]);
      } else if (res?.data?.err) {
        setSearchKeyError(true);
        setSearchResults([]);
      }
    }
  };

  // handle click button
  const handleOnClick = async () => {
    // fetch here
    const res = await axios.post('api/companies/search', {
      keyword: searchKey,
    });

    if (res.data?.rooms) {
      setSearchKeyError(false);
      setSearchResults(res.data?.rooms);
    } else if (res?.data?.msg) {
      setSearchKeyError(false);
      setSearchResults([]);
    } else if (res?.data?.err) {
      setSearchKeyError(true);
      setSearchResults([]);
    }
  };

  const RoomList =
    searchResults?.length > 0
      ? searchResults?.map((room) => (
          <Grid item xs={4} sm={4} md={4} lg={6} key={room?._id}>
            <CardInternship room={room} />
          </Grid>
        ))
      : getRoomsList.map((room) => (
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
            {searchKeyError ? (
              <Typography
                variant='h6'
                component='p'
                width='100%'
                mt={{ xs: 3, sm: 5 }}
                textAlign='center'
              >
                No results matched your search.
              </Typography>
            ) : (
              RoomList
            )}
          </Grid>
        </Box>
      </Container>
    </Fragment>
  );
};
export default InternshipList;
