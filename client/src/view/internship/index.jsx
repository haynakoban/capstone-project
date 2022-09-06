import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import SearchIcon from '@mui/icons-material/Search';
import photo from '../../assets/svg/online_learning_re_qw08.svg';

import { Fragment, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  isUserAuthorized,
  isUserLoggedIn,
} from '../../features/users/usersSlice';

import MainLayout from '../../layout';
import {
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
} from '../../components/global/Search';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
}));

const InternshipList = () => {
  const dispatch = useDispatch();

  // is user authorize
  const isUserAuthorize = useSelector(isUserAuthorized);

  // handle visible routes
  useEffect(() => {
    dispatch(isUserLoggedIn()).unwrap();
  }, [dispatch]);

  return (
    <Fragment>
      {!isUserAuthorize ? (
        <Navigate to='/login' />
      ) : (
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
                      >
                        See Details
                      </Button>
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};
export default InternshipList;
