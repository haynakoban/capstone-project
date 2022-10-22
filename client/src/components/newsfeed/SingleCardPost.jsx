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
import SendIcon from '@mui/icons-material/Send';

import { useContext, useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../lib/authContext';

import { DownloadableFile, StyledTypography, TimeAgo } from '../global';
import PostClickAwayHandler from './PostClickAwayHandler';
import {
  addComment,
  fetchComments,
  selectAllComments,
} from '../../features/comments/commentsSlice';
import CommentsCard from './CommentsCard';
import avatarTheme from '../../lib/avatar';

const SingleCardPost = ({ post }) => {
  const { _user } = useContext(AuthContext);
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  const comments = useSelector(selectAllComments);

  const [commentsList, setCommentsList] = useState([]);
  const [values, setValues] = useState({
    text: '',
    post_id: post?._id,
    user_id: _user?._id,
  });

  useEffect(() => {
    setValues({
      text: '',
      post_id: post?._id,
      user_id: _user?._id,
    });
  }, [post?._id, _user?._id]);

  useEffect(() => {
    if (post?._id) {
      dispatch(fetchComments({ post_id: post?._id })).unwrap();
    }
  }, [post?._id, dispatch]);

  useEffect(() => {
    if (comments) {
      startTransition(() => {
        const orderedPosts = comments
          ?.slice()
          ?.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

        setCommentsList(orderedPosts);
      });
    }
  }, [comments]);

  // handle change
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // handle event key
  const handleKeyDown = (event) => {
    const { text, post_id, user_id } = values;

    if (!text) {
      return;
    } else {
      if (event.shiftKey && event.code === 'Enter') {
        dispatch(
          addComment({
            text,
            post_id,
            user_id,
          })
        ).unwrap();

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
      dispatch(
        addComment({
          text,
          post_id,
          user_id,
        })
      ).unwrap();
      setValues({
        text: '',
        post_id: post?._id,
        user_id: _user?._id,
      });
    }
  };

  let content;
  content = commentsList?.map((comment) => {
    return <CommentsCard comment={comment} key={comment?._id} />;
  });

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
          >
            {post?.text}
          </StyledTypography>
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
          alignItems: 'flex-start',
        }}
      >
        <Avatar
          sx={{
            bgcolor: avatarTheme({
              name: _user?.name?.[0]?.toLowerCase(),
            }),
            mr: 1,
          }}
          aria-label='recipe'
        >
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

      <CardContent sx={{ px: 3, py: 0, mt: 2 }}>
        <Divider flexItem sx={{ bgcolor: '#202128', height: '1px' }} />
      </CardContent>

      {/* list of comments */}
      {isPending ? <h4>Loading...</h4> : content}
    </Card>
  );
};
export default SingleCardPost;
