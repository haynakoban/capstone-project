import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import SearchIcon from '@mui/icons-material/Search';
import photo from '../../assets/svg/online_learning_re_qw08.svg';

import { Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import MainLayout from '../../layout/MainLayout';
import { Item } from '../../components/global/ItemGrid';
import {
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
} from '../../components/global/Search';
import { AuthContext } from '../../lib/authContext';
import { useContext } from 'react';

const Rooms = () => {
  const navigate = useNavigate();
  const { _isUserAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!_isUserAuth) {
      navigate('/login');
    }
  }, [_isUserAuth, navigate]);

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
      <Outlet />
    </Fragment>
  );
};
export default Rooms;