import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { acceptIntern } from '../../features/companies/companiesSlice';
import { StackContainer, StyledPostBox } from '../global';
import DeleteInternRequest from './DeleteInternRequest';

const Request = ({ req, room }) => {
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // delete modal handler
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const handleAccept = () => {
    dispatch(acceptIntern({ id: room?._id, user_id: req?.user_id }));
  };

  return (
    <Box
      key={req?.user_id}
      sx={{
        p: { xs: 2, sm: 2, md: 3 },
        mb: 3,
        border: '1px solid #20212870',
      }}
    >
      <Stack
        mb={1}
        display='flex'
        direction='row'
        justifyContent='space-between'
      >
        <Typography variant='h6' fontWeight={700}>
          {req?.name}
        </Typography>
      </Stack>

      <StackContainer>
        <Typography variant='body1'>
          {req?.name} wants to apply for internship to your company.
        </Typography>
        <Typography variant='body1' mt={0.75}>
          Kindly review the request and my documents.
        </Typography>
        <Box
          my={1.5}
          width='100%'
          className='comment'
          sx={{
            overflow: 'auto',
            '> div': {
              mb: 0.5,
            },
          }}
        >
          <StyledPostBox>{req?.filename}</StyledPostBox>
        </Box>

        <Box sx={{ mt: { xs: 1, sm: 2 } }}>
          <Button
            variant='contained'
            color='success'
            sx={{
              mr: 2,
              color: '#fff',
            }}
            onClick={handleAccept}
          >
            Accept
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={handleDeleteModalOpen}
          >
            Decline
          </Button>
        </Box>
      </StackContainer>
      <Modal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Fragment>
          <DeleteInternRequest
            room={room}
            req={req}
            handleDeleteModalClose={handleDeleteModalClose}
          />
        </Fragment>
      </Modal>
    </Box>
  );
};
export default Request;
