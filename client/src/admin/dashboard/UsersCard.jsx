import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import avatarTheme from '../../lib/avatar';

const UsersCard = ({ type, sum = 0, route, members = [] }) => {
  const navigate = useNavigate();

  const ListOfMembers = members?.map((member) => {
    return (
      <ListItem key={member.name}>
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: avatarTheme({
                name: member?.name?.[0]?.toLowerCase(),
              }),
            }}
            aria-label='recipe'
          >
            {member?.name?.[0]?.toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={member?.name} />
      </ListItem>
    );
  });

  return (
    <Paper
      elevation={1}
      sx={{
        border: '1px solid #00000050',
        width: { xs: '100%', sm: '50%' },
        p: 3,
      }}
    >
      <Box display='flex' justifyContent='space-between'>
        <Box>
          <Typography
            variant='p'
            component='p'
            color='text.primary'
            fontWeight={700}
            fontSize='1.15rem'
          >
            {type}
          </Typography>
          <Typography variant='caption' component='p' color='text.secondary'>
            Total: {sum}
          </Typography>
        </Box>

        <Typography
          variant='p'
          component='p'
          color='primary'
          fontWeight={500}
          sx={{ cursor: 'pointer' }}
          // fix the click event
          onClick={() => navigate(`${route}`)}
        >
          View all
        </Typography>
      </Box>

      {/* list of users with name */}
      <List>{ListOfMembers}</List>
    </Paper>
  );
};
export default UsersCard;
