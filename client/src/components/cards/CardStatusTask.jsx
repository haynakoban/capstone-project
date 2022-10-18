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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate } from 'react-router-dom';

const CardStatusTask = ({ name, tasks = [], no = '', type }) => {
  const navigate = useNavigate();

  let ListOfTasks;
  if (tasks?.length > 0) {
    ListOfTasks = tasks?.map((task) => {
      return (
        <ListItem
          key={task?._id}
          disablePadding
          onClick={() =>
            navigate(`/room/${task?.company_id}/tasks/${task?._id}`)
          }
        >
          <ListItemButton>
            {type === 'pending' ? (
              <ListItemIcon>
                <RadioButtonUncheckedIcon />
              </ListItemIcon>
            ) : (
              <ListItemIcon>
                <CheckCircleIcon color='primary' />
              </ListItemIcon>
            )}

            <ListItemText
              primary={task?.title}
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
  }

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
      {!no ? (
        <List>{ListOfTasks}</List>
      ) : (
        <Typography
          variant='p'
          component='p'
          color='text.primary'
          fontWeight={500}
          mt={1}
        >
          {no}
        </Typography>
      )}
    </Paper>
  );
};
export default CardStatusTask;
