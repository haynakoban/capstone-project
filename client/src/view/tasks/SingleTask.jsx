import { Box, Container, IconButton } from '@mui/material';
import CardStatusTask from '../../components/cards/CardStatusTask';
import SingleTaskCard from '../../components/tasks/SingleTaskCard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useParams } from 'react-router-dom';
import { pendingTasks, completedTasks } from './dummy';
import RoomLayout from '../../layout/RoomLayout';

const SingleTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
          {/* {ListOfTasks} */}
          <IconButton
            sx={{ mb: 2 }}
            size='large'
            // get the company id
            onClick={() => navigate(`/room/${id}/tasks`)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <SingleTaskCard />
        </Container>

        {/* list of tasks */}
        <Box
          maxWidth='xs'
          width={356}
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'block',
              lg: 'block',
            },
            position: 'relative',
          }}
        >
          <Box position='fixed' width='inherit'>
            {/* pending - call the card status task */}
            <CardStatusTask tasks={pendingTasks} name='Pending Tasks' />

            {/* completed - call the card status task */}
            <CardStatusTask tasks={completedTasks} name='Completed Tasks' />
          </Box>
        </Box>
      </Box>
    </RoomLayout>
  );
};
export default SingleTask;
