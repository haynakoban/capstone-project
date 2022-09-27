import { Box, Container } from '@mui/material';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../../lib/authContext';
import {
  getCompanyInfo,
  getRoomInfo,
} from '../../features/companies/companiesSlice';

import RoomLayout from '../../layout/RoomLayout';
import CardPost from '../../components/newsfeed/CardPost';
import CardMemberIcon from '../../components/cards/CardMemberIcon';
import CreatePostAction from '../../components/newsfeed/CreatePostAction';
import {
  fetchPosts,
  getPostsStatus,
  selectAllPosts,
} from '../../features/posts/postsSlice';

const PostsList = () => {
  const [auth, setAuth] = useState(false);
  const [posts, setPosts] = useState([]);
  const { _user, _isUserAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const dispatch = useDispatch();
  const getPosts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const roomInfo = useSelector(getCompanyInfo);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts({ company_id: room_id }));
    }
  }, [postStatus, getPosts, room_id, dispatch]);

  useEffect(() => {
    dispatch(getRoomInfo(room_id)).unwrap();
  }, [room_id, dispatch]);

  useEffect(() => {
    if (!_isUserAuth) {
      navigate('/login');
    }
  }, [_isUserAuth, navigate]);

  useEffect(() => {
    if (auth) {
      if (_user?.employeeInfo?.listOfCompanies?.length > 0) {
        const res = _user?.employeeInfo?.listOfCompanies?.some(
          (e) => e.company_id === room_id
        );

        if (!res) navigate('/room');
      } else if (_user?.internInfo?.companyInfo?.company_id) {
        if (_user?.internInfo?.companyInfo?.company_id !== room_id) {
          navigate('/room');
        }
      }
    } else {
      setAuth(true);
    }
  }, [
    auth,
    _user?.isIntern,
    _user?.internInfo?.companyInfo?.company_id,
    _user?.employeeInfo?.listOfCompanies,
    room_id,
    navigate,
  ]);

  useEffect(() => {
    if (getPosts) {
      const posts = getPosts.map((p) => {
        return { ...p, isExpanded: false };
      });
      setPosts(posts);
    }
  }, [getPosts]);

  const handleExpandClick = (post) => {
    const findPost = posts.find((p) => p?._id === post?._id);

    findPost.isExpanded = !post?.isExpanded;

    const newPosts = posts.filter((p) => p?._id !== post?._id);

    newPosts.push(findPost);

    newPosts.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      } else if (b.id < a.id) {
        return 1;
      } else {
        return 0;
      }
    });

    setPosts(newPosts);
  };

  let content;
  if (postStatus === 'loading') {
    content = <h4>Loading...</h4>;
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts
      ?.slice()
      ?.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

    content = orderedPosts?.map((post) => {
      return (
        <CardPost
          post={post}
          key={post?._id}
          handleExpandClick={handleExpandClick}
        />
      );
    });
  } else if (postStatus === 'failed') {
    content = <h4>Data not found!</h4>;
  }

  return (
    <RoomLayout>
      <Box display='flex' justifyContent='space-between'>
        {/* posts */}
        <Container
          maxWidth='md'
          disableGutters
          sx={{
            marginLeft: 0,
            width: {
              xs: '100%',
              sm: '100%',
              md: 'calc(100% - 380px)',
            },
          }}
        >
          <CreatePostAction />

          {content}
        </Container>

        {/* members */}
        <CardMemberIcon members={roomInfo.members?.slice(0, 5)} />
      </Box>
    </RoomLayout>
  );
};
export default PostsList;
