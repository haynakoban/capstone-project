import { Box } from '@mui/material';
import { Fragment } from 'react';

import StyledPaperCard from './StyledPaperCard';
import MediaModal from '../../../view/video/MediaModal';

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
            hours={working_hours?.int_remaining_hours}
          />
          <StyledPaperCard
            text='Completed Hours'
            hours={working_hours?.int_completed_hours}
          />
        </Box>
      ) : (
        <Box display='flex' justifyContent='flex-end'>
          <MediaModal user={_user} />
        </Box>
      )}
    </Fragment>
  );
};
export default DashboardHeader;
