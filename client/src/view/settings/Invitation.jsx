import {
  Box,
  Button,
  CardMedia,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { StackContainer, StyledContainer } from '../../components/global';
import photo from '../../assets/sample/logo2_(bnb).png';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ProfileLayout from '../../layout/ProfileLayout';
import DeleteOfferAction from '../../components/settings/DeleteOfferAction';

import { AuthContext } from '../../lib/authContext';
import { acceptCompanyOffer } from '../../features/users/usersSlice';

const Invitation = () => {
  const { _user, _isUserAuth } = useContext(AuthContext);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!_isUserAuth) {
      navigate('/login');
    }
    if (!_user?.isIntern) {
      navigate('/settings/account');
    }
  }, [_isUserAuth, _user?.isIntern, navigate]);

  // delete modal handler
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const handleAccept = ({ user_id, company_id }) => {
    dispatch(acceptCompanyOffer({ user_id, company_id }));
  };

  return (
    <ProfileLayout>
      <StyledContainer width='lg'>
        {/* list of invitation will appear here */}
        {_user?.internInfo?.offers?.length > 0
          ? _user?.internInfo?.offers?.map((offer) => (
              <Fragment key={offer?.company_id}>
                <Box
                  key={offer?.company_id}
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
                      {offer?.company_name}
                    </Typography>

                    <CardMedia
                      component='img'
                      sx={{ width: 40 }}
                      image={photo}
                      alt='just a normal'
                      className='company_logo'
                    />
                  </Stack>

                  <StackContainer>
                    <Typography variant='body1'>
                      {offer?.company_name} accepts your application. If you
                      wish to complete your internship program with{' '}
                      {offer?.company_name}.
                    </Typography>
                    <Typography variant='body1' mt={0.75}>
                      Kindly accept the invitation.
                    </Typography>

                    <Box sx={{ mt: { xs: 1, sm: 2 } }}>
                      <Button
                        variant='contained'
                        color='success'
                        sx={{
                          mr: 2,
                          color: '#fff',
                        }}
                        {...(!_user?._id && { disabled: true })}
                        onClick={() =>
                          handleAccept({
                            user_id: _user?._id,
                            company_id: offer?.company_id,
                          })
                        }
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
                </Box>
                <Modal
                  open={deleteModalOpen}
                  onClose={handleDeleteModalClose}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Fragment>
                    <DeleteOfferAction
                      user_id={_user?._id}
                      offer={offer}
                      handleDeleteModalClose={handleDeleteModalClose}
                    />
                  </Fragment>
                </Modal>
              </Fragment>
            ))
          : 'No Offer'}
      </StyledContainer>
    </ProfileLayout>
  );
};
export default Invitation;
