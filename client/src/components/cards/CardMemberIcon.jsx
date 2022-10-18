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
import { useLocation, useNavigate } from 'react-router-dom';
import avatarTheme from '../../lib/avatar';

const CardMemberIcon = ({ members }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const room_path = pathname.slice(0, 30);

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
      <Paper elevation={2} sx={{ p: 3, position: 'fixed', width: 'inherit' }}>
        <Box display='flex' justifyContent='space-between'>
          <Typography
            variant='p'
            component='p'
            color='text.primary'
            fontWeight={700}
            fontSize='1.15rem'
          >
            Members
          </Typography>
          <Typography
            variant='p'
            component='p'
            color='primary'
            fontWeight={500}
            sx={{ cursor: 'pointer' }}
            // fix the click event
            onClick={() => navigate(`${room_path}/member`)}
          >
            View all
          </Typography>
        </Box>

        {/* list of members with name */}
        <List>{ListOfMembers}</List>
      </Paper>
    </Box>
  );
};
export default CardMemberIcon;
