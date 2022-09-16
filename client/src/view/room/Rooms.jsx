import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Modal,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import SearchIcon from '@mui/icons-material/Search';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';

import photo from '../../assets/svg/online_learning_re_qw08.svg';
import RoomField from '../../components/forms/RoomField';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../lib/authContext';

import MainLayout from '../../layout/MainLayout';
import {
  StyledModalBox,
  Item,
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
} from '../../components/global';
import {
  createNewRoom,
  getMyRoom,
  myRooms,
} from '../../features/companies/companiesSlice';

const Rooms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roomList = useSelector(myRooms);
  const { _isUserAuth, _user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);

  // handle modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // handle success snackbar
  const handleSuccessOpen = () => setOpenSuccessSnackBar(true);
  const handleSuccessClose = () => setOpenSuccessSnackBar(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roomName: '',
    },
  });

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

  const handleFormSubmit = async (data) => {
    const { roomName } = data;

    dispatch(
      createNewRoom({
        name: roomName,
        createdBy: _user?.name,
        members: _user?._id,
      })
    ).unwrap();

    handleSuccessOpen();
    handleClose();
    reset({ roomName: '' });
  };

  return (
    <Fragment>
      <MainLayout />

      {/* content */}
      <Toolbar />
      <Container maxWidth='lg' sx={{ p: 1 }}>
        {!_user?.isIntern && (
          <Fragment>
            {/* create room */}
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant='outlined'
                startIcon={<GroupAddOutlinedIcon />}
                onClick={handleOpen}
              >
                Create Room
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <StyledModalBox
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Toolbar
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    disableGutters
                  >
                    <Typography variant='h6' component='h6' fontWeight={700}>
                      Create a new room
                    </Typography>
                  </Toolbar>
                  {/* Room Name */}
                  <RoomField
                    errors={errors.roomName?.message}
                    name='roomName'
                    label='Room Name'
                    register={register}
                    watch={watch}
                    minlen={4}
                  />

                  {/* create room */}
                  <Button
                    variant='contained'
                    onClick={handleSubmit(handleFormSubmit)}
                    type='submit'
                    sx={{ marginX: 'auto' }}
                  >
                    Create
                  </Button>
                </StyledModalBox>
              </Modal>
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
              {roomList.map((room) => (
                <Grid item xs={2} sm={4} md={4} lg={4} key={room?._id}>
                  <Item>
                    <img
                      src={photo}
                      alt='just a normal'
                      width={45}
                      height={45}
                      className='company_logo'
                      style={{
                        alignSelf: 'flex-end',
                      }}
                    />

                    <Typography fontWeight={500} fontSize='1.25rem' mt={1}>
                      {room?.name}
                    </Typography>
                    <Button
                      variant='contained'
                      sx={{ mt: 2, alignSelf: 'flex-end' }}
                      onClick={() => navigate(`/room/${room?._id}`)}
                    >
                      Dashboard
                    </Button>
                  </Item>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
      <Snackbar
        open={openSuccessSnackBar}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
      >
        <Alert
          onClose={handleSuccessClose}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          New Room Created
        </Alert>
      </Snackbar>
    </Fragment>
  );
};
export default Rooms;
