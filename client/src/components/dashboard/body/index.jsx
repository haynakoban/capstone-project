import { Box, Typography } from '@mui/material';
import PostCard from './PostCard';

const AnnouncementPost = () => {
  return (
    <Box mt={3}>
      <Typography
        variant='body1'
        component='div'
        letterSpacing={1}
        fontWeight={600}
        textTransform='uppercase'
        pl={3}
      >
        Announcements :
      </Typography>

      {/* the post details */}
      <PostCard />
    </Box>
  );
};
export default AnnouncementPost;
