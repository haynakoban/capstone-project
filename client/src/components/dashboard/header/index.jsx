import { Box } from '@mui/material';
import StyledPaperCard from './StyledPaperCard';

const DashboardHeader = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      sx={{
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'center', sm: 'flex-start' },
      }}
    >
      <StyledPaperCard text='Remaining Hours' hours='60' />
      <StyledPaperCard text='Completed Hours' hours='400' />
    </Box>
  );
};
export default DashboardHeader;
