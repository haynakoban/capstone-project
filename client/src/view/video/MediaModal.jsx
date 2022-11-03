import { Button, Modal } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';

import { Fragment, useState } from 'react';
import MediaConstraints from './MediaConstraints';

const MediaModal = ({ user }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // update modal handler
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <Fragment>
      <Button
        variant='contained'
        startIcon={<VideocamIcon />}
        sx={{ textTransform: 'capitalize' }}
        onClick={handleModalOpen}
      >
        Meet
      </Button>

      {/* edit attendance */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Fragment>
          <MediaConstraints user={user} handleModalClose={handleModalClose} />
        </Fragment>
      </Modal>
    </Fragment>
  );
};
export default MediaModal;
