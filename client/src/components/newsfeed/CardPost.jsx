import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
} from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../lib/authContext';

import { ExpandMore, StyledTypography, TimeAgo } from '../global';
import PostClickAwayHandler from './PostClickAwayHandler';

const CardPost = ({ post, handleExpandClick }) => {
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

      <CardContent sx={{ px: 3, py: 0 }}>
        <StyledTypography variant='body1' component='pre'>
          {!post?.isExpanded && post?.text?.substring(0, 500)}
          {!post?.isExpanded && post?.text?.length > 500 ? '...' : ''}

          <Collapse in={post?.isExpanded} timeout='auto' unmountOnExit>
            <StyledTypography variant='body1' component='pre'>
              {post?.text}
            </StyledTypography>
          </Collapse>

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
        </StyledTypography>
      </CardContent>

      <CardContent sx={{ px: 3, py: 0, mt: 2 }}>
        <Divider flexItem />
      </CardContent>

      {/* for comments */}
      {/*  */}
    </Card>
  );
};
export default CardPost;
