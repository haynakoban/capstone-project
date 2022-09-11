import { Box, styled } from '@mui/material';

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
