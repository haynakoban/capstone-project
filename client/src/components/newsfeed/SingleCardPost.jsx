import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';

import { useContext } from 'react';
import { AuthContext } from '../../lib/authContext';

import { StyledTypography, TimeAgo } from '../global';
import PostClickAwayHandler from './PostClickAwayHandler';

const SingleCardPost = ({ post }) => {
  const { _user } = useContext(AuthContext);

  return (
    <Card elevation={2} key={post._id} sx={{ mb: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }} aria-label='recipe'>
            {post?.name?.[0]?.toUpperCase()}
          </Avatar>
        }
        action={
          _user?._id === post?.user_id ? (
            <PostClickAwayHandler post={post} />
          ) : undefined
        }
        title={post?.name}
        subheader={<TimeAgo timestamp={post?.updatedAt} />}
      />

      <CardContent
        sx={{
          px: 3,
          py: 0,
        }}
      >
        <StyledTypography
          variant='body1'
          component='pre'
          sx={{ cursor: 'pointer' }}
        >
          {post?.text}
        </StyledTypography>
      </CardContent>

      <CardContent sx={{ px: 3, py: 0, mt: 2 }}>
        <Divider flexItem sx={{ bgcolor: '#202128', height: 1.65 }} />
      </CardContent>

      {/* for comments */}
      <CardContent
        sx={{
          mt: 2,
          px: 3,
          py: 0,
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }} aria-label='recipe'>
          {_user?.name?.[0]?.toUpperCase()}
        </Avatar>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'flex-start',
          }}
        >
          <TextField
            variant='standard'
            fullWidth
            className='comment'
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: '0.9rem !important',
              border: '1px solid #20212850',
              '.css-1aqqp93-MuiInputBase-root-MuiInput-root:after': {
                borderBottom: 'none',
              },
              '.css-1aqqp93-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before':
                {
                  borderBottom: 'none',
                },
              '.css-1aqqp93-MuiInputBase-root-MuiInput-root:before': {
                borderBottom: 0,
              },
            }}
            required
            type='text'
            multiline
            minRows={1}
            maxRows={20}
            autoComplete='off'
            placeholder='Write a comment'
          />
          <Box
            sx={{
              width: { xs: '100%', sm: 'auto' },
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton size='small' sx={{ color: '#202128' }}>
              <AttachFileIcon />
            </IconButton>
            <IconButton size='small' sx={{ color: '#202128' }}>
              <ImageIcon />
            </IconButton>
            <IconButton size='small' sx={{ color: '#202128' }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>

      {/* list of comments */}
    </Card>
  );
};
export default SingleCardPost;
