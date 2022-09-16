import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      PageNotFound 404
      <Button variant='outlined' onClick={() => navigate('/')}>
        go home
      </Button>
    </Container>
  );
};
export default PageNotFound;
