import { Box, Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Fragment } from 'react';
import StyledPaperCard from './StyledPaperCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  DailyAttendanceDateFormatter,
  TimeFormatter,
} from '../../../lib/DateFormatter';
import { createLog } from '../../../features/logs/logsSlice';

const DashboardHeader = ({ _user, working_hours, room_id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            onClick={() => {
              const date = new Date();

              // create log
              if (_user?.isIntern) {
                dispatch(
                  createLog({
                    user_id: _user?._id,
                    report_date: DailyAttendanceDateFormatter(date),
                    time: TimeFormatter(date),
                    user_type: 'Intern',
                    log: `Joined a meeting`,
                  })
                );
              } else {
                dispatch(
                  createLog({
                    user_id: _user?._id,
                    report_date: DailyAttendanceDateFormatter(date),
                    time: TimeFormatter(date),
                    user_type: 'Employee',
                    log: `Joined a meeting`,
                  })
                );
              }

              navigate(`/room/${room_id}/video`);
            }}
          >
            Meet
          </Button>
        </Box>
      )}
    </Fragment>
  );
};
export default DashboardHeader;
