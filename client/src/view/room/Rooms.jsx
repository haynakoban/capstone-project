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

import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MainLayout from '../../layout/MainLayout';
import { StyledModalBox, Item } from '../../components/global';
import {
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
} from '../../components/global/Search';
import { AuthContext } from '../../lib/authContext';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import RoomField from '../../components/forms/RoomField';
import axios from '../../lib/axiosConfig';

const Rooms = () => {
  const navigate = useNavigate();
  const { _isUserAuth, _user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    if (!_isUserAuth) {
      navigate('/login');
    }
  }, [_isUserAuth, navigate]);

  const handleFormSubmit = async (data) => {
    const res = await axios.post('api/companies', {
      name: data?.roomName,
      createdBy: _user?.name,
    });

    // open a snackbar
    if (res.data?.company) {
      handleSuccessOpen();
      handleClose();
      reset({ roomName: '' });
    }
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
              My Rooms
            </Typography>
            <Typography variant='body1' component='p'>
              6 rooms
            </Typography>
          </Toolbar>
          <Grid
            container
            spacing={{ xs: 1, sm: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
          >
            {Array.from(Array(6)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4} lg={4} key={index}>
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
                    MySQL Technology
                  </Typography>
                  <Button
                    variant='contained'
                    sx={{ mt: 2, alignSelf: 'flex-end' }}
                    onClick={() => navigate(`/room/${index}`)}
                  >
                    Dashboard
                  </Button>
                </Item>
              </Grid>
            ))}
          </Grid>
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
