import { IconButton, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { Fragment, useState } from 'react';
import EditDailyAttendance from './EditDailyAttendance';

const DailyModal = ({ intern }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // update modal handler
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <Fragment>
      <IconButton size='small' onClick={handleModalOpen}>
        <EditIcon />
      </IconButton>

      {/* edit attendance */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Fragment>
          <EditDailyAttendance
            intern={intern}
            handleModalClose={handleModalClose}
          />
        </Fragment>
      </Modal>
    </Fragment>
  );
};
export default DailyModal;
