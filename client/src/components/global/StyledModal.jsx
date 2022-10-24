import { Box, Stack, styled } from '@mui/material';

export const StyledModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: 600,
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: theme.spacing(3),
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  background: '#f2f2f2',
}));

export const StyledModalBoxAttendance = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  left: '50%',
  transform: 'translate(-50%, 20px)',
  maxHeight: 600,
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  background: '#f2f2f2',
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    width: 500,
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: '1px solid #20212850',
  borderLeft: '1px solid #20212850',
  borderRight: '1px solid #20212850',
}));

export const StackContainer = styled(Stack)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),

  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },

  '> .css-12dg26w-MuiStack-root:last-child': {
    borderBottom: '1px solid #20212850',
  },
}));

// const PaperStyled = styled(Paper)(() => ({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   textAlign: 'center',
//   border: '1px solid #FFF',
//   width: '207.734px !important',
//   minHeight: '112px !important',
//   margin: 'auto',
//   '&:hover': {
//     border: '1px solid #3751FF',
//     color: '#3751FF',

//     '> p': {
//       color: '#3751FF',
//     },
//   },
// }));

// export const StyledPaper = ({ text, hours }) => {
//   return (
//     <PaperStyled>
//       <Typography
//         paragraph
//         sx={{
//           color: '#9FA2B4',
//         }}
//       >
//         {text}
//       </Typography>
//       <Typography variant='h4' fontWeight={600}>
//         {hours}
//       </Typography>
//     </PaperStyled>
//   );
// };
