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

const CardMemberIcon = ({ members }) => {
  const ListOfMembers = members.map((member) => {
    return (
      <ListItem key={member.name}>
        <ListItemAvatar>
          <Avatar>{member?.name[0]?.toUpperCase()}</Avatar>
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
            onClick={() => console.log('link to /member')}
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
