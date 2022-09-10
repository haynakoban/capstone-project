import { Box, Grid } from '@mui/material';
import MemberFooter from './member';
import TasksFooter from './tasks';

const DashboardFooter = ({ Tasks, Member }) => {
  return (
    <Box mt={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <MemberFooter Member={Member} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TasksFooter Tasks={Tasks} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default DashboardFooter;
