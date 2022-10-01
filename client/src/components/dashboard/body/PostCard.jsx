import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';

import { StyledPostBox, StyledTypography, TimeAgo } from '../../global';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Card elevation={2} key={post?.[0]._id} sx={{ mb: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }} aria-label='recipe'>
            {post?.[0]?.name?.[0]?.toUpperCase()}
          </Avatar>
        }
        title={post?.[0]?.name}
        subheader={<TimeAgo timestamp={post?.[0]?.updatedAt} />}
      />
      {post?.[0]?.text && (
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
            {post?.[0]?.text}
          </StyledTypography>
        </CardContent>
      )}

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

      <CardContent
        sx={{
          px: 3,
          py: 0,
          mt: 1,
        }}
      >
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
      </CardContent>
    </Card>
  );
};
export default PostCard;
