import { Box, Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Fragment } from 'react';
import StyledPaperCard from './StyledPaperCard';

const DashboardHeader = ({ _user, working_hours }) => {
  return (
    <Fragment>
      {_user.isIntern ? (
        <Box
          display='flex'
          justifyContent='center'
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' },
          }}
        >
          <StyledPaperCard
            text='Remaining Hours'
            hours={working_hours?.remaining_hours}
          />
          <StyledPaperCard
            text='Completed Hours'
            hours={working_hours?.completed_hours}
          />
        </Box>
      ) : (
        <Box display='flex' justifyContent='flex-end'>
          <Button
            variant='contained'
            startIcon={<VideocamIcon />}
            sx={{ textTransform: 'capitalize' }}
            onClick={() => console.log('start a call')}
          >
            Meet
          </Button>
        </Box>
      )}
    </Fragment>
  );
};
export default DashboardHeader;
