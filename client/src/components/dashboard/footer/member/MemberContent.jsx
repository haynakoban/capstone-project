import { List, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';

const MemberContent = ({ members }) => {
  const [values, setValues] = useState([
    {
      users: 0,
      roles: 'Member',
    },
    {
      users: 0,
      roles: 'Owner',
    },
    {
      users: 0,
      roles: 'All',
    },
  ]);

  useEffect(() => {
    if (members) {
      setValues([
        {
          users: members.filter((m) => m.roles === 'owner').length,
          roles: 'Owner',
        },
        {
          users: members.filter((m) => m.roles === 'member').length,
          roles: 'Member',
        },
        {
          users: members.length,
          roles: 'All',
        },
      ]);
    }
  }, [members]);

  return (
    <List>
      {values.map((member) => {
        return (
          <ListItem
            key={member?.roles}
            divider
            secondaryAction={member?.users}
            sx={{
              color: '#9FA2B4',
            }}
          >
            <ListItemText
              primary={member?.roles}
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
