import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  border: '1px solid #FFF',
  width: '207.734px !important',
  minHeight: '112px !important',
  [theme.breakpoints.up('xs')]: {
    margin: '5px 0',
  },
  [theme.breakpoints.up('sm')]: {
    margin: '5px',
  },
  [theme.breakpoints.up('md')]: {
    margin: '0 5px',
  },
  '&:hover': {
    border: '1px solid #3751FF',
    color: '#3751FF',

    '> p': {
      color: '#3751FF',
    },
  },
}));

const StyledPaperCard = ({ text, hours }) => {
  return (
    <StyledPaper>
      <Typography
        paragraph
        sx={{
          color: '#9FA2B4',
        }}
      >
        {text}
      </Typography>
      <Typography variant='h4' fontWeight={600}>
        {hours}
      </Typography>
    </StyledPaper>
  );
};
export default StyledPaperCard;
