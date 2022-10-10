import { Box, Stack, Typography } from '@mui/material';
import { StackContainer, TimeAgo } from '../global';

const Pending = ({ pen }) => {
  return (
    <Box
      key={pen.user_id}
      sx={{
        p: 2,
        mb: 3,
        border: '1px solid #20212870',
      }}
    >
      <Stack display="flex" direction="column" justifyContent="space-between">
        <Box display="flex" flexDirection="column" mb={1}>
          <Typography variant="h6" fontWeight={700}>
            {pen?.name}
          </Typography>
          <TimeAgo timestamp={pen.createdAt} />
          <TimeAgo />
        </Box>

        <StackContainer>
          <Typography variant="body1">
            Waiting for the intern to accept the invitation
          </Typography>
        </StackContainer>
      </Stack>
    </Box>
  );
};

export default Pending;
