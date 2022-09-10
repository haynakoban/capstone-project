import { Avatar, Box, Button, Paper } from '@mui/material';

import Author from './Author';
import TimeAgo from './TimeAgo';
import PostContent from './PostContent';

const PostCard = () => {
  return (
    <Paper elevation={2} sx={{ mt: 1, p: 3 }}>
      <Box display='flex' alignItems='center'>
        {/* avatar */}
        <Avatar sx={{ color: '#fff', bgcolor: '#902133' }}>E</Avatar>

        <Box display='flex' flexDirection='column' ml={1.5}>
          {/* author */}
          <Author />

          {/* time */}
          <TimeAgo />
        </Box>
      </Box>

      {/* post content */}
      <PostContent />

      {/* redirect the user to the actual post */}
      <Box display='flex' justifyContent='center'>
        <Button
          variant='outlined'
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
