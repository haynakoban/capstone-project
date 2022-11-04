import { Box, Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';

import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';

import StyledPaperCard from './StyledPaperCard';

const DashboardHeader = ({ _user, working_hours, room_id }) => {
  const navigate = useNavigate();

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
            hours={working_hours?.int_remaining_hours}
          />
          <StyledPaperCard
            text='Completed Hours'
            hours={working_hours?.int_completed_hours}
          />
        </Box>
      ) : (
        <Box display='flex' justifyContent='flex-end'>
          <Button
            variant='contained'
            startIcon={<VideocamIcon />}
            sx={{ textTransform: 'capitalize' }}
            onClick={() => navigate(`/room/${room_id}/video`)}
          >
            Meet
          </Button>
        </Box>
      )}
    </Fragment>
  );
};
export default DashboardHeader;
