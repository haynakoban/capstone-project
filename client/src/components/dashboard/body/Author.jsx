import { Typography } from '@mui/material';

const Author = ({ name }) => {
  return (
    <Typography variant='p' component='p' color='text.primary' fontWeight={600}>
      {name}
    </Typography>
  );
};
export default Author;
