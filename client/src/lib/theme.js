import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#3751FF',
      transparent: '#3751FF50',
    },
    secondary: {
      main: '#2a70d9',
      transparent: '#2a70d950',
    },
    warning: {
      main: '#FEC400',
      transparent: '#FEC40050',
    },
    success: {
      main: '#198754',
      transparent: '#19875450',
    },
  },
  typography: {
    fontFamily: `Mulish, Poppins, sans-serif`,
  },
  //   components: {
  //     MuiOutlinedInput: {
  //       variants: [
  //         {
  //           props: { variant: 'outlined' },
  //           style: {
  //             border: 0,
  //             backgroundColor: '#4D4D4D',
  //             borderRadius: '50px',
  //             color: 'white',
  //             '&:active': { borderBottom: 'none' },
  //             '&:hover': { borderBottom: 'none', backgroundColor: '#4D4D4D' },
  //             '&::before': { borderBottom: 'none' },
  //           },
  //         },
  //       ],
  //     },
  //     MuiButton: {
  //       variants: [
  //         {
  //           props: { variant: 'contained' },
  //           style: {
  //             color: '#222',
  //             backgroundColor: '#fff',
  //             borderRadius: '50px',
  //             padding: '8px 36px',
  //             '&:hover': {
  //               backgroundColor: 'red',
  //               color: '#fff',
  //             },
  //           },
  //         },
  //         {
  //           props: { variant: 'nav' },
  //           style: {
  //             color: '#fff',
  //           },
  //         },
  //       ],
  //       styleOverrides: {
  //         root: {
  //           color: '#222',
  //           fontSize: '16px',
  //         },
  //       },
  //     },
  //     MuiCard: {
  //       variants: [
  //         {
  //           props: { variant: 'team' },
  //           style: {
  //             color: '#000',
  //             backgroundColor: '#FF577F',
  //             margin: '10px',
  //             borderRadius: '25px',
  //           },
  //         },
  //       ],
  //     },
  //     MuiMenuItem: {
  //       styleOverrides: {
  //         root: {
  //           backgroundColor: '#000',
  //         },
  //       },
  //     },
  //   },
});

export default responsiveFontSizes(mainTheme);
