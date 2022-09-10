import { List, ListItem, ListItemText } from '@mui/material';

const TasksContent = ({ Tasks }) => {
  return (
    <List>
      {Tasks.map((task) => {
        return (
          <ListItem key={task?.text} divider secondaryAction={task?.icon}>
            <ListItemText
              primary={task?.text}
              sx={{
                color: '#000',
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
};
export default TasksContent;
