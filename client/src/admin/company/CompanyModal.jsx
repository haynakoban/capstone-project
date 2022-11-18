import { Button, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { Fragment, useState } from 'react';
import AddCompany from './AddCompany';

const CompanyModal = ({ setSortedName }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // update modal handler
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <Fragment>
      <Button
        variant='contained'
        startIcon={<EditIcon />}
        sx={{ textTransform: 'capitalize' }}
        onClick={handleModalOpen}
      >
        Add Company
      </Button>

      {/* open add company modal */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Fragment>
          <AddCompany
            handleModalClose={handleModalClose}
            setSortedName={setSortedName}
          />
        </Fragment>
      </Modal>
    </Fragment>
  );
};
export default CompanyModal;
