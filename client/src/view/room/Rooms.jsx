import {
  Alert,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import SearchIcon from '@mui/icons-material/Search';

import CardRoom from '../../components/cards/CardRoom';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../lib/authContext';

import MainLayout from '../../layout/MainLayout';
import {
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
} from '../../components/global';
import { getMyRoom, myRooms } from '../../features/companies/companiesSlice';
import CreateRoom from '../../components/room/CreateRoom';
import JoinRoom from '../../components/room/JoinRoom';

const Rooms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roomList = useSelector(myRooms);
  const { _isUserAuth, _user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
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

  const RoomList = roomList.map((room) => (
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
              {roomList.length > 1 ? 'My Rooms' : 'My Room'}
            </Typography>
            <Typography variant='body1' component='p'>
              {roomList.length} {roomList.length > 1 ? 'rooms' : 'room'}
            </Typography>
          </Toolbar>

          {loading && (
            <Grid
              container
              spacing={{ xs: 1, sm: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
            >
              {RoomList}
            </Grid>
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
