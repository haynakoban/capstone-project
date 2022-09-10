import { Container, styled } from '@mui/material';

const UseStyledContainer = styled((props) => {
  const { ...others } = props;
  return <Container {...others} />;
})(({ theme }) => ({
  padding: theme.spacing(3),
  marginLeft: 0,
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  background: '#fff',
}));

export const StyledContainer = ({ children, width }) => {
  return <UseStyledContainer maxWidth={width}>{children}</UseStyledContainer>;
};
