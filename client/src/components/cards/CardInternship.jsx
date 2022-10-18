import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';

import photo from '../../assets/svg/online_learning_re_qw08.svg';
import { StyledModalBox } from '../global';
import ApplyInternship from '../internship/ApplyInternship';

const CardInternship = ({ room }) => {
  const [open, setOpen] = useState(false);

  // modal handler
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <Fragment>
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
                onClick={handleModalOpen}
              >
                Details
              </Button>
              <ApplyInternship id={room?._id} />
            </Box>
          </CardContent>
        </Box>
      </Card>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Fragment>
          <StyledModalBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography variant='h6' fontWeight={600}>
                Company Description:
              </Typography>
            </Box>

            <Typography
              variant='body1'
              component='pre'
              className='comment'
              sx={{
                my: 1,
                p: 2,
                borderRadius: '0.9rem !important',
                border: '1px solid #20212850',
                hyphens: 'auto',
                overflowWrap: 'break-word',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
              }}
            >
              {!room?.description ? 'No Description' : room?.description}
            </Typography>
          </StyledModalBox>
        </Fragment>
      </Modal>
    </Fragment>
  );
};
export default CardInternship;
