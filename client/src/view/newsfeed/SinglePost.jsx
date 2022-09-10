import { Container } from '@mui/material';
import RoomLayout from '../../layout/RoomLayout';

// will fix this soon
const SinglePost = () => {
  return (
    <RoomLayout>
      <Container
        maxWidth='md'
        disableGutters
        sx={{ mx: 0, border: '1px solid green' }}
      >
        SinglePost
      </Container>
    </RoomLayout>
  );
};
export default SinglePost;
