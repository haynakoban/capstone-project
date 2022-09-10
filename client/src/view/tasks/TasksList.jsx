import { Box, Container } from '@mui/material';
import CardStatusTask from '../../components/cards/CardStatusTask';
import TaskCard from '../../components/tasks/TaskCard';
import RoomLayout from '../../layout/RoomLayout';

import { pendingTasks, completedTasks } from './dummy';

const TasksList = () => {
  const tasks = completedTasks.concat(pendingTasks);
  const ListOfTasks = tasks.map((task) => {
    return <TaskCard task={task} key={task.text} />;
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
          {ListOfTasks}
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
export default TasksList;
