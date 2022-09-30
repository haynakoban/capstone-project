import { Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MemberContent from './MemberContent';

// also accept company name
const MemberFooter = ({ room_info }) => {
  const navigate = useNavigate();

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box display='flex' justifyContent='space-between'>
        <Typography
          variant='p'
          component='p'
          color='text.primary'
          fontWeight={700}
          fontSize='1.15rem'
        >
          Member
        </Typography>
        <Typography
          variant='p'
          component='p'
          color='primary'
          fontWeight={500}
          sx={{ cursor: 'pointer' }}
          // fix the click event
          onClick={() => navigate(`member`)}
        >
          View all
        </Typography>
      </Box>

      {/* change the company name */}
      <Typography
        variant='subtitle2'
        component='span'
        color='#9FA2B4'
        fontWeight={500}
      >
        Company:{' '}
        <Typography
          variant='subtitle2'
          component='span'
          color='#000'
          fontWeight={500}
        >
          {room_info?.roomName}
        </Typography>
      </Typography>

      {/* list of member in card*/}
      <MemberContent members={room_info?.members} />
    </Paper>
  );
};
export default MemberFooter;
