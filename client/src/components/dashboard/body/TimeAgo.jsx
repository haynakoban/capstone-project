import { Typography } from '@mui/material';
// import { parseISO, formatDistanceToNow } from 'date-fns';

// get the parameter 'timestamp'
const TimeAgo = () => {
  //   let timeAgo = '';

  //   if (timestamp) {
  //     const date = parseISO(timestamp);
  //     const timePeriod = formatDistanceToNow(date);
  //     timeAgo = `${timePeriod} ago`;
  //   }

  return (
    <Typography variant='subtitle2' title='timestamp' sx={{ color: '#9FA2B4' }}>
      07 June 2022, 09:41 PM
    </Typography>
  );
};
export default TimeAgo;
