import { Box, Paper, Typography } from '@mui/material';
import TasksContent from './TasksContent';

const TasksFooter = ({ Tasks }) => {
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box display='flex' justifyContent='space-between'>
        <Typography
          variant='p'
          component='p'
          color='text.primary'
          fontWeight={700}
          fontSize='1.15rem'
        >
          Tasks
        </Typography>
        <Typography
          variant='p'
          component='p'
          color='primary'
          fontWeight={500}
          sx={{ cursor: 'pointer' }}
          // fix the click event
          onClick={() => console.log('link to /task')}
        >
          View all
        </Typography>
      </Box>
      <Typography
        variant='subtitle2'
        component='span'
        color='#9FA2B4'
        fontWeight={500}
      >
        Today
      </Typography>

      {/* list of tasks in card*/}
      <TasksContent Tasks={Tasks} />
    </Paper>
  );
};
export default TasksFooter;
