import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../lib/authContext';

import { ExpandMore, StyledTypography, TimeAgo } from '../global';
import PostClickAwayHandler from './PostClickAwayHandler';

const CardPost = ({ post, handleExpandClick }) => {
  const { _user } = useContext(AuthContext);
  const navigate = useNavigate();

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
          onClick={() => navigate(`${post._id}`)}
        >
          {!post?.isExpanded && post?.text?.substring(0, 500)}
          {!post?.isExpanded && post?.text?.length > 500 ? '...' : ''}

          <Collapse in={post?.isExpanded} timeout='auto' unmountOnExit>
            <StyledTypography variant='body1' component='pre'>
              {post?.text}
            </StyledTypography>
          </Collapse>
        </StyledTypography>
        <ExpandMore
          expand={post?.isExpanded}
          onClick={() => handleExpandClick(post)}
          aria-expanded={post.isExpanded}
          aria-label='show more'
          variant='span'
          component='span'
          color='primary.main'
        >
          {post?.text?.length > 500
            ? post?.isExpanded
              ? 'See less'
              : 'See more'
            : ''}
        </ExpandMore>
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
    </Card>
  );
};
export default CardPost;
