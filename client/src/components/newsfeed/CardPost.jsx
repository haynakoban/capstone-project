import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
} from '@mui/material';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../lib/authContext';
import avatarTheme from '../../lib/avatar';

import {
  DownloadableFile,
  ExpandMore,
  StyledTypography,
  TimeAgo,
} from '../global';
import PostClickAwayHandler from './PostClickAwayHandler';

const CardPost = ({ post, handleExpandClick }) => {
  const { _user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Card elevation={2} key={post._id} sx={{ mb: 3 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: avatarTheme({
                name: post?.name?.[0]?.toLowerCase(),
              }),
            }}
            aria-label='recipe'
          >
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

      {post?.text && (
        <CardContent
          sx={{
            px: 3,
            py: 0,
          }}
        >
          <StyledTypography
            variant='body1'
            component='pre'
            sx={{
              cursor: 'pointer',
              hyphens: 'auto',
              overflowWrap: 'break-word',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
            onClick={() => navigate(`${post._id}`)}
          >
            {!post?.isExpanded && post?.text?.substring(0, 500)}
            {!post?.isExpanded && post?.text?.length > 500 ? '...' : ''}

            <Collapse in={post?.isExpanded} timeout='auto' unmountOnExit>
              <StyledTypography
                variant='body1'
                component='pre'
                sx={{
                  hyphens: 'auto',
                  overflowWrap: 'break-word',
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                }}
              >
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
      )}
      {post?.filename && (
        <CardContent
          sx={{
            px: 3,
            py: 0,
            mt: 1,
          }}
        >
          <DownloadableFile file={post?.filename} id={post?.file_id} />
        </CardContent>
      )}

      <CardContent sx={{ px: 3, py: 0, mt: 2 }}>
        <Divider flexItem sx={{ bgcolor: '#202128', height: '1px' }} />
      </CardContent>

      {/* for comments */}
      <CardContent
        sx={{
          mt: 2,
          px: 3,
          py: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          sx={{ color: '#202128' }}
          onClick={() => navigate(`${post._id}`)}
        >
          Write a comment
        </Button>
      </CardContent>
    </Card>
  );
};
export default CardPost;
