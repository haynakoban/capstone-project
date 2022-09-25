import { Box, Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Fragment, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../lib/authContext';
import StyledPaperCard from './StyledPaperCard';

const DashboardHeader = () => {
  const { _user, _isUserAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!_isUserAuth) {
      navigate('/login');
    }
  }, [_isUserAuth, navigate]);

  useEffect(() => {
    if (_user?.isIntern) {
      if (_user?.internInfo?.companyInfo?.company_id !== id) {
        navigate('/room');
      }
    } else {
      const res = _user?.employeeInfo?.listOfCompanies?.some(
        (e) => e.company_id === id
      );
      if (!res) navigate('/room');
    }
  }, [
    _user?.isIntern,
    _user?.internInfo?.companyInfo?.company_id,
    _user?.employeeInfo?.listOfCompanies,
    id,
    navigate,
  ]);

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
            hours={_user?.internInfo?.workingHours?.remaining}
          />
          <StyledPaperCard
            text='Completed Hours'
            hours={_user?.internInfo?.workingHours?.completed}
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
