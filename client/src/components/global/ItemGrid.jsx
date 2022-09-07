import { Paper, styled } from '@mui/material';

export const Item = styled(Paper)(({ theme }) => ({
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
