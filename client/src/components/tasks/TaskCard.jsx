import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Card elevation={2} sx={{ mb: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }} aria-label='recipe'>
            {task?.assignedBy[0]?.toUpperCase()}
          </Avatar>
        }
        action={
          <Toolbar
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant='body2' fontWeight={700}>
              Due {task?.date?.due}
            </Typography>
            <Typography variant='body2' fontWeight={700}>
              Closes {task?.date?.closes}
            </Typography>
          </Toolbar>
        }
        title={task?.assignedBy}
        subheader='about an hour ago'
      />
      <CardContent
        sx={{
          px: 3,
          py: 0,
          mb: 2,
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <Typography variant='body2' fontWeight={700}>
          Due {task?.date?.due}
        </Typography>
        <Typography variant='body2' fontWeight={700}>
          Closes {task?.date?.closes}
        </Typography>
      </CardContent>

      <CardContent
        sx={{
          px: 3,
          py: 0,
        }}
      >
        <Typography variant='h6' fontWeight={700} mb={2}>
          {task?.text}
        </Typography>

        <Button
          variant='outlined'
          sx={{ px: '23px' }}
          onClick={() => navigate(`/room/${id}/tasks/${task?.id}`)}
        >
          View Task
        </Button>
      </CardContent>
    </Card>
  );
};
export default TaskCard;
