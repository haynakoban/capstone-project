import { styled } from '@mui/material';

// const StyledBox = styled((props) => {
//   const { ...others } = props;
//   return <Box {...others} />;
// })(({ theme }) => ({
//   height: '100%',
//   padding: theme.spacing(3),
//   marginLeft: 0,
//   boxShadow: theme.shadows[2],
//   borderRadius: theme.shape.borderRadius,
// }));

const LogInContainer = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 0,
  height: '100vh',
  // backgroundColor: alpha(theme.palette.common.black, 0.1),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.black, 0.15),
  // },
  // [theme.breakpoints.up('sm')]: {
  //   marginLeft: theme.spacing(1),
  //   width: 'auto',
  // },
}));

const LogInPage = () => {
  return <LogInContainer>LogInPage</LogInContainer>;
};
export default LogInPage;
