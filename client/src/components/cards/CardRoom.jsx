import { Button, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { Item } from '../global';
import photo from '../../assets/svg/online_learning_re_qw08.svg';

const CardRoom = ({ room }) => {
  const navigate = useNavigate();

  return (
    <Item key={room?._id}>
      <img
        src={photo}
        alt='just a normal'
        width={45}
        height={45}
        className='company_logo'
        style={{
          alignSelf: 'flex-end',
        }}
      />

      <Typography
        fontWeight={500}
        fontSize='1.25rem'
        mt={1}
        sx={{
          height: 30,
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
          height: 30,
          overflow: 'hidden',
        }}
      >
        {room?.companyName}
      </Typography>

      <Button
        variant='contained'
        sx={{ mt: 2, alignSelf: 'flex-end' }}
        onClick={() => navigate(`/room/${room?._id}`)}
      >
        Dashboard
      </Button>
    </Item>
  );
};
export default CardRoom;
