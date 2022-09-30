import { Box, Paper, styled, Typography } from '@mui/material';

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

export const StyledTypography = styled((props) => {
  const { ...others } = props;
  return <Typography {...others} />;
})(() => ({
  color: 'text.primary',
  whiteSpace: 'pre-wrap',
}));

export const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <Typography {...other} />;
})(({ theme }) => ({
  cursor: 'pointer',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.625, 1.5),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid #3751FF`,
  color: '#3751FF',
  width: '100%',
  overflow: 'hidden',
  height: 37,
}));

export const StyledPostBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.625, 1.5),
  borderRadius: theme.shape.borderRadius,
  background: '#20212815',
  border: `1px solid #202128`,
  color: '#202128',
  width: '100%',
  overflow: 'hidden',
  height: 37,
}));
