import { Avatar, Box, CardContent, Typography } from '@mui/material';

import { useContext } from 'react';
import { AuthContext } from '../../lib/authContext';
import avatarTheme from '../../lib/avatar';
import CommentClickAwayHandler from './CommentClickAwayHandler';

const CommentsCard = ({ comment }) => {
  const { _user } = useContext(AuthContext);

  return (
    <CardContent
      key={comment?._id}
      sx={{
        mt: 2,
        px: 3,
        py: 0,
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <Avatar
        sx={{
          mr: 1,
          bgcolor: avatarTheme({
            name: comment?.name?.[0]?.toLowerCase(),
          }),
        }}
        aria-label='recipe'
      >
        {comment?.name?.[0]?.toUpperCase()}
      </Avatar>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='body1'
          component='pre'
          sx={{
            px: 1.75,
            py: 0.4,
            borderRadius: '0.9rem !important',
            border: '1px solid #20212850',
            lineHeight: 1.6,
            hyphens: 'auto',
            overflowWrap: 'break-word',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
        >
          <Typography variant='p' component='div' sx={{ fontWeight: 700 }}>
            {comment?.name}
          </Typography>

          {comment?.text}
        </Typography>
        {_user?._id === comment?.user_id ? (
          <CommentClickAwayHandler comment={comment} />
        ) : undefined}
      </Box>
    </CardContent>
  );
};
export default CommentsCard;
