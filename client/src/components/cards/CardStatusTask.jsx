import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';

const CardStatusTask = ({ name, tasks }) => {
  const ListOfTasks = tasks.map((task) => {
    return (
      <ListItem key={task?.text} disablePadding>
        <ListItemButton>
          <ListItemIcon>{task?.status}</ListItemIcon>
          <ListItemText
            primary={task?.text}
            sx={{
              color: '#000',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, width: 'inherit' }}>
      <Box display='flex' justifyContent='space-between'>
        <Typography
          variant='p'
          component='p'
          color='text.primary'
          fontWeight={700}
          fontSize='1.15rem'
        >
          {name}
        </Typography>
        <Typography
          variant='p'
          component='p'
          color='primary'
          fontWeight={500}
          sx={{ cursor: 'pointer' }}
          // fix the click event
          onClick={() => console.log(`link to ${name}`)}
        >
          View all
        </Typography>
      </Box>

      {/* list of  tasks */}
      <List>{ListOfTasks}</List>
    </Paper>
  );
};
export default CardStatusTask;
