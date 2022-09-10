import { Box, Button, ClickAwayListener, styled } from '@mui/material';
import { useState, Fragment } from 'react';
import {
  ExpandMoreOutlined,
  UploadFileOutlined,
  DriveFolderUploadOutlined,
} from '@mui/icons-material';

const StyledButton = styled((props) => {
  const { ...others } = props;
  return <Button {...others} />;
})(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '1rem',
  textTransform: 'capitalize',

  '&:hover': {
    backgroundColor: '#00000020',
  },
}));

const ActionHandler = () => {
  const [open, setOpen] = useState(false);

  // click away listener
  const handleClick = () => setOpen((prev) => !prev);
  const handleClickAway = () => setOpen(false);

  return (
    <Fragment>
      <ClickAwayListener
        mouseEvent='onMouseDown'
        touchEvent='onTouchStart'
        onClickAway={handleClickAway}
      >
        <Box sx={{ position: 'relative' }}>
          <Button
            aria-label='Upload'
            sx={{
              textTransform: 'capitalize',
              color: '#000',
              fontSize: '1rem',

              '&:hover': {
                bgcolor: '#00000020',
              },
            }}
            onClick={handleClick}
            endIcon={<ExpandMoreOutlined />}
          >
            Upload File
          </Button>

          {/* open the click away listener */}
          {open ? (
            <Box
              sx={{
                position: 'absolute',
                top: 35,
                right: 0,
                zIndex: 1,
                width: 161,
                boxShadow: 10,
                borderRadius: 2,
                p: 1,
                bgcolor: 'background.paper',
              }}
            >
              <StyledButton
                startIcon={<UploadFileOutlined />}
                // onClick={handleDeleteModalOpen}
              >
                Upload File
              </StyledButton>
              <StyledButton
                startIcon={<DriveFolderUploadOutlined />}
                // onClick={handleDeleteModalOpen}
              >
                Upload Folder
              </StyledButton>
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>
    </Fragment>
  );
};
export default ActionHandler;
