import { List, ListItem, ListItemText } from '@mui/material';

const MemberContent = ({ Member }) => {
  return (
    <List>
      {Member.map((member) => {
        return (
          <ListItem
            key={member?.users}
            divider
            secondaryAction={member?.active}
            sx={{
              color: '#9FA2B4',
            }}
          >
            <ListItemText
              primary={member?.users}
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
export default MemberContent;
