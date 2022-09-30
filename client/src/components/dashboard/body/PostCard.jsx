import { Avatar, Box, Button, CardContent, Paper } from '@mui/material';

import Author from './Author';
import { StyledPostBox, TimeAgo } from '../../global';
import PostContent from './PostContent';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Paper elevation={2} sx={{ mt: 1, p: 3 }}>
      <Box display='flex' alignItems='center'>
        {/* avatar */}
        <Avatar sx={{ color: '#fff', bgcolor: '#902133' }}>
          {post?.[0]?.name?.[0]?.toUpperCase()}
        </Avatar>

        <Box display='flex' flexDirection='column' ml={1.5}>
          {/* author */}
          <Author name={post?.[0]?.name} />

          {/* time */}
          <TimeAgo timestamp={post?.[0]?.updatedAt} />
        </Box>
      </Box>

      {/* post content */}
      <PostContent text={post?.[0]?.text} />

      {post?.[0]?.filename && (
        <CardContent
          sx={{
            px: 3,
            py: 0,
            mt: 1,
          }}
        >
          <StyledPostBox>{post?.[0]?.filename}</StyledPostBox>
        </CardContent>
      )}

      {/* redirect the user to the actual post */}
      <Box display='flex' justifyContent='center'>
        <Button
          variant='outlined'
          onClick={() => navigate(`newsfeed/${post?.[0]?._id}`)}
          sx={{
            mt: 1.5,
            color: '#3751FF',
          }}
        >
          Check post
        </Button>
      </Box>
    </Paper>
  );
};
export default PostCard;
