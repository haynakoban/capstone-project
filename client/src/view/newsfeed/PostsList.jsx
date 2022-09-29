import { Box, Container } from '@mui/material';

import { useContext, useEffect, useState, useTransition } from 'react';
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
import { fetchPosts, selectAllPosts } from '../../features/posts/postsSlice';

const PostsList = () => {
  const [auth, setAuth] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isPending, startTransition] = useTransition();
  const { _user, _isUserAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const dispatch = useDispatch();
  const getPosts = useSelector(selectAllPosts);
  const roomInfo = useSelector(getCompanyInfo);

  useEffect(() => {
    dispatch(fetchPosts({ company_id: room_id }));
  }, [room_id, dispatch]);

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
    _user?.internInfo?.companyInfo?.company_id,
    _user?.employeeInfo?.listOfCompanies,
    room_id,
    navigate,
  ]);

  useEffect(() => {
    if (getPosts) {
      startTransition(() => {
        const posts = getPosts.map((p) => {
          return { ...p, isExpanded: false };
        });

        const orderedPosts = posts
          ?.slice()
          ?.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

        setPosts(orderedPosts);
      });
    }
  }, [getPosts]);

  const handleExpandClick = (post) => {
    const findPost = posts.find((p) => p?._id === post?._id);

    findPost.isExpanded = !post?.isExpanded;

    const newPosts = posts.filter((p) => p?._id !== post?._id);

    newPosts.push(findPost);

    newPosts.sort((a, b) => {
      if (a.updatedAt < b.updatedAt) {
        return 1;
      } else if (b.updatedAt < a.updatedAt) {
        return -1;
      } else {
        return 0;
      }
    });

    setPosts(newPosts);
  };

  let content;
  content = posts?.map((post) => {
    return (
      <CardPost
        post={post}
        key={post?._id}
        handleExpandClick={handleExpandClick}
      />
    );
  });

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

          {isPending ? <h4>Loading...</h4> : content}
        </Container>

        {/* members */}
        <CardMemberIcon members={roomInfo.members?.slice(0, 5)} />
      </Box>
    </RoomLayout>
  );
};
export default PostsList;
