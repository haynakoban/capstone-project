import { Box, Stack, styled } from '@mui/material';

export const StyledModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  padding: theme.spacing(3),
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  background: '#f2f2f2',
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
