import { Typography } from '@mui/material';
import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
  let timeAgo = '';

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date, {
      addSuffix: true,
      includeSeconds: true,
    }).replace('about ', '');
    timeAgo = `${timePeriod}`;
  }

  return (
    <Typography variant='caption' title={timestamp}>
      {timeAgo}
    </Typography>
  );
};
export default TimeAgo;
