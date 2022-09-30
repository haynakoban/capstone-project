import { Box, Typography } from '@mui/material';
import PostCard from './PostCard';

const AnnouncementPost = ({ post }) => {
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
        Latest Post :
      </Typography>

      {/* the post details */}
      <PostCard post={post} />
    </Box>
  );
};
export default AnnouncementPost;
