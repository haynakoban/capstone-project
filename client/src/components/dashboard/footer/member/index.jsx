import { Box, Paper, Typography } from '@mui/material';
import MemberContent from './MemberContent';

// also accept company name
const MemberFooter = ({ Member }) => {
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
          onClick={() => console.log('link to /member')}
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
          TechTalk
        </Typography>
      </Typography>

      {/* list of member in card*/}
      <MemberContent Member={Member} />
    </Paper>
  );
};
export default MemberFooter;
