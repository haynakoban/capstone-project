import {
  Alert,
  Box,
  Container,
  Divider,
  Grid,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import axios from '../../lib/axiosConfig';

import MainLayout from '../../layout/MainLayout';
import CardRoom from '../../components/cards/CardRoom';
import CreateRoom from '../../components/room/CreateRoom';
import JoinRoom from '../../components/room/JoinRoom';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../lib/authContext';
import {
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
} from '../../components/global';
import { getMyRoom, myRooms } from '../../features/companies/companiesSlice';

const Rooms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roomList = useSelector(myRooms);
  const { _isUserAuth, _user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchKeyError, setSearchKeyError] = useState(false);
  const [openCreateRoomSnackBar, setOpenCreateRoomSnackBar] = useState(false);
  const [openJoinRoomSnackBar, setOpenJoinRoomSnackBar] = useState(false);

  // handle create room snackbar
  const handleCreateRoomOpen = () => setOpenCreateRoomSnackBar(true);
  const handleCreateRoomClose = () => setOpenCreateRoomSnackBar(false);

  // handle create room snackbar
  const handleJoinRoomOpen = () => setOpenJoinRoomSnackBar(true);
  const handleJoinRoomClose = () => setOpenJoinRoomSnackBar(false);

  // if authorize can access this page
  // otherwise redirect to login page
  useEffect(() => {
    if (!_isUserAuth) {
      navigate('/login');
    }
  }, [_isUserAuth, navigate]);

  useEffect(() => {
    if (!_user?._id) {
      setLoading(false);
    } else {
      dispatch(getMyRoom({ id: _user?._id })).unwrap();
      setLoading(true);
    }
  }, [dispatch, _user?._id]);

  // handle event key
  const handleKeyDown = async (event) => {
    if (event.code === 'Enter' || (event.shiftKey && event.code === 'Enter')) {
      // fetch here
      const res = await axios.post('api/companies/search', {
        keyword: searchKey,
        id: _user?._id,
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
      id: _user?._id,
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
          <Grid item xs={2} sm={4} md={4} lg={4} key={room?._id}>
            <CardRoom room={room} />
          </Grid>
        ))
      : roomList.map((room) => (
          <Grid item xs={2} sm={4} md={4} lg={4} key={room?._id}>
            <CardRoom room={room} />
          </Grid>
        ));

  return (
    <Fragment>
      <MainLayout />

      {/* content */}
      <Toolbar />
      <Container maxWidth='lg' sx={{ p: 1 }}>
        {!_user?.isIntern && (
          <Fragment>
            {/* create room */}
            <Toolbar
              sx={{
                display: 'flex',
                justifyContent: {
                  xs: 'center',
                  sm: 'flex-end',
                  md: 'flex-end',
                },
                '> button:last-child': { ml: 2 },
              }}
            >
              <CreateRoom
                id={_user?._id}
                handleCreateRoomOpen={handleCreateRoomOpen}
              />

              <JoinRoom
                id={_user?._id}
                handleJoinRoomOpen={handleJoinRoomOpen}
              />
            </Toolbar>

            <Divider sx={{ bgcolor: '#00000050' }} />
          </Fragment>
        )}
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
              {roomList.length > 1 ? 'My Rooms' : 'My Room'}
            </Typography>
            <Typography variant='body1' component='p'>
              {roomList.length} {roomList.length > 1 ? 'rooms' : 'room'}
            </Typography>
          </Toolbar>

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
            loading && (
              <Grid
                container
                spacing={{ xs: 1, sm: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
              >
                {RoomList}
              </Grid>
            )
          )}
        </Box>
      </Container>
      <Snackbar
        open={openCreateRoomSnackBar}
        autoHideDuration={6000}
        onClose={handleCreateRoomClose}
      >
        <Alert
          onClose={handleCreateRoomClose}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          New Room Created
        </Alert>
      </Snackbar>
      <Snackbar
        open={openJoinRoomSnackBar}
        autoHideDuration={6000}
        onClose={handleJoinRoomClose}
      >
        <Alert
          onClose={handleJoinRoomClose}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          Successfully Joined in a Room
        </Alert>
      </Snackbar>
    </Fragment>
  );
};
export default Rooms;
