import { Box, Grid } from '@mui/material';
import MemberFooter from './member';
import TasksFooter from './tasks';

const DashboardFooter = ({ Tasks, room_info }) => {
  return (
    <Box mt={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <MemberFooter room_info={room_info} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TasksFooter Tasks={Tasks} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default DashboardFooter;
