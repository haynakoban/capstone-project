import { Fragment, useState } from 'react';
import {
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  Modal,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import UpdateComment from './UpdateComment';
import DeleteComment from './DeleteComment';

const CommentClickAwayHandler = ({ comment }) => {
  const [open, setOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // click away listener
  const handleClick = () => setOpen((prev) => !prev);
  const handleClickAway = () => setOpen(false);

  // update modal handler
  const handleUpdateModalOpen = () => setUpdateModalOpen(true);
  const handleUpdateModalClose = () => setUpdateModalOpen(false);

  // delete modal handler
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  return (
    <Fragment>
      <ClickAwayListener
        mouseEvent='onMouseDown'
        touchEvent='onTouchStart'
        onClickAway={handleClickAway}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            aria-label='settings'
            size='small'
            sx={{ float: 'right', color: '#202128' }}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>

          {open ? (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: { xs: 'none', sm: 'none', md: 25 },
                right: { xs: 25, sm: 25, md: 'none' },
                zIndex: 1000,
                width: 110,
                boxShadow: 10,
                borderRadius: 2,
                p: 1,
                bgcolor: 'background.paper',
              }}
            >
              <Button
                startIcon={<EditOutlinedIcon />}
                sx={{ color: '#000000', justifyContent: 'flex-start' }}
                fullWidth
                onClick={handleUpdateModalOpen}
              >
                Edit
              </Button>
              <Button
                startIcon={<DeleteOutlinedIcon />}
                sx={{ color: '#dc3545', justifyContent: 'flex-start' }}
                fullWidth
                onClick={handleDeleteModalOpen}
              >
                Delete
              </Button>
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>

      {/* edit post */}
      <Modal
        open={updateModalOpen}
        onClose={handleUpdateModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Fragment>
          <UpdateComment
            comment={comment}
            handleUpdateModalClose={handleUpdateModalClose}
          />
        </Fragment>
      </Modal>

      {/* delete post */}
      <Modal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Fragment>
          <DeleteComment
            comment={comment}
            handleDeleteModalClose={handleDeleteModalClose}
          />
        </Fragment>
      </Modal>
    </Fragment>
  );
};
export default CommentClickAwayHandler;
