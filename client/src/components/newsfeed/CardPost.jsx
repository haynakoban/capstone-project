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
import SendIcon from '@mui/icons-material/Send';

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../lib/authContext';

import {
  ExpandMore,
  StyledPostBox,
  StyledTypography,
  TimeAgo,
} from '../global';
import PostClickAwayHandler from './PostClickAwayHandler';
import { useEffect } from 'react';
import axios from '../../lib/axiosConfig';
import CommentsCard from './CommentsCard';

const CardPost = ({ post, handleExpandClick }) => {
  const { _user } = useContext(AuthContext);
  const [comment, setComment] = useState([]);
  const [values, setValues] = useState({
    text: '',
    post_id: post?._id,
    user_id: _user?._id,
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`api/comments/comment/${post._id}`).then((res) => {
      if (res.data?.comment.length > 0 && res.data?.user.length > 0) {
        res.data.comment[0].name = res.data.user?.[0].name;
        setComment(res.data.comment);
      }
    });
  }, [post._id]);

  useEffect(() => {
    setValues({
      text: '',
      post_id: post?._id,
      user_id: _user?._id,
    });
  }, [post?._id, _user?._id]);

  // handle change
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // handle event key
  const handleKeyDown = async (event) => {
    const { text, post_id, user_id } = values;

    if (!text) {
      return;
    } else {
      if (event.shiftKey && event.code === 'Enter') {
        axios.post('api/comments', { text, post_id, user_id }).then((res) => {
          if (res.data.comment && res.data.user) {
            const { name } = res.data.user[0];

            res.data.comment.name = name;
            setComment((prev) => [...prev, res.data.comment]);
          }
        });

        setValues({
          text: '',
          post_id: post?._id,
          user_id: _user?._id,
        });
      }
    }
  };

  const handleFormSubmit = async () => {
    const { text, post_id, user_id } = values;

    if (!text) {
      return;
    } else {
      axios.post('api/comments', { text, post_id, user_id }).then((res) => {
        if (res.data.comment && res.data.user) {
          const { name } = res.data.user[0];

          res.data.comment.name = name;
          setComment((prev) => [...prev, res.data.comment]);
        }
      });

      setValues({
        text: '',
        post_id: post?._id,
        user_id: _user?._id,
      });
    }
  };

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
          <StyledPostBox>{post?.filename}</StyledPostBox>
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
            name='text'
            value={values.text}
            onChange={handleChange('text')}
            onKeyDown={handleKeyDown}
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
            <IconButton
              size='small'
              sx={{ color: '#202128' }}
              onClick={handleFormSubmit}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>

      {/* some of the comments */}
      {comment.length > 0 &&
        comment?.map((comment) => (
          <CommentsCard comment={comment} key={comment?._id} />
        ))}
    </Card>
  );
};
export default CardPost;
