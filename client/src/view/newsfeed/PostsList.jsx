import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { members, posts } from './dummyData';
import CardPost from '../../components/newsfeed/CardPost';
import CardMemberIcon from '../../components/cards/CardMemberIcon';
import RoomLayout from '../../layout/RoomLayout';

const PostsList = () => {
  const [listOfPosts, setListOfPosts] = useState(posts);

  const handleExpandClick = (post) => {
    const findPost = listOfPosts.find((p) => p?.id === post?.id);

    findPost.isExpanded = !post?.isExpanded;

    const newPosts = listOfPosts.filter((p) => p?.id !== post?.id);

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

    setListOfPosts(newPosts);
  };

  const ListOfPosts = listOfPosts.map((post) => {
    return (
      <CardPost
        post={post}
        key={post?.id}
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
          {ListOfPosts}
        </Container>

        {/* members */}
        <CardMemberIcon members={members} />
      </Box>
    </RoomLayout>
  );
};
export default PostsList;
