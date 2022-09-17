import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import photo from '../../assets/svg/online_learning_re_qw08.svg';

const CardInternship = ({ room }) => {
  return (
    <Card
      key={room?._id}
      sx={{
        display: 'flex',
        height: { xs: 120, sm: 130, md: 160, lg: 180 },
      }}
    >
      <CardMedia
        component='img'
        sx={{ width: { xs: 120, sm: 130, md: 160, lg: 180 } }}
        image={photo}
        alt='just a normal'
        className='company_logo'
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography
            component='div'
            variant='h5'
            sx={{
              width: 'auto',
              height: { xs: 26.672, sm: 27.984, md: 31.984 },
              overflow: 'hidden',
            }}
          >
            {room?.roomName}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
            sx={{
              width: 'auto',
              height: 28,
              overflow: 'hidden',
            }}
          >
            {room?.companyName}
          </Typography>
          <Typography
            variant='subtitle2'
            component='pre'
            color='text.secondary'
            sx={{
              width: 'auto',
              height: { xs: 'auto', sm: 'auto', md: 27, lg: 45 },
              display: { xs: 'none', sm: 'none', md: 'block' },
              overflow: 'hidden',
            }}
          >
            {room?.description && room?.description}
          </Typography>

          <Box sx={{ mt: { xs: 0.5, sm: 1 } }}>
            <Button
              variant='contained'
              color='primary'
              sx={{
                mr: 2,
                color: '#fff',
              }}
              onClick={() => console.log('show modal | show description')}
            >
              Details
            </Button>
            <Button
              variant='contained'
              color='success'
              onClick={() => console.log('send file')}
            >
              Apply
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};
export default CardInternship;
