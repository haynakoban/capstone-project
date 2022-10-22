import { Box, Button, ClickAwayListener, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { Fragment, useState } from 'react';
import { StyledPostBox } from './ItemGrid';
import axios from '../../lib/axiosConfig';

import FileDownload from 'js-file-download';

const DownloadableFileAction = ({ file, id }) => {
  const [open, setOpen] = useState(false);

  // click away listener
  const handleClick = () => setOpen((prev) => !prev);
  const handleClickAway = () => setOpen(false);

  const handleFileDownload = (id) => {
    axios
      .get(`api/downloads/${id}`, { responseType: 'blob' })
      .then((res) => {
        FileDownload(res.data, file);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Fragment>
      <ClickAwayListener
        mouseEvent='onMouseDown'
        touchEvent='onTouchStart'
        onClickAway={handleClickAway}
      >
        <Box sx={{ position: 'relative', zIndex: '1000' }}>
          <IconButton aria-label='settings' size='small' onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>

          {open ? (
            <Box
              sx={{
                position: 'absolute',
                top: 1,
                right: 10,
                zIndex: '1500',
                borderRadius: 2,
                px: 1,
                boxSizing: 'border-box',
                height: '33px',
                bgcolor: 'background.paper',
                border: '1px solid #203128',
              }}
            >
              <Button
                startIcon={<FileDownloadIcon />}
                sx={{
                  height: 'inherit',
                  color: '#203128',
                  textTransform: 'capitalize',
                  fontSize: 15,
                }}
                fullWidth
                onClick={() => handleFileDownload(id)}
              >
                Download
              </Button>
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>
    </Fragment>
  );
};

const DownloadableFile = ({ file, id }) => {
  const [show, setShow] = useState(false);

  // handle show icon
  const handleShowIconOpen = () => setShow(true);
  const handleShowIconClose = () => setShow(false);

  return (
    <Fragment>
      <StyledPostBox
        onMouseEnter={handleShowIconOpen}
        onMouseLeave={handleShowIconClose}
      >
        <Box
          sx={{
            width: 100,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flexGrow: 1,
          }}
        >
          {file}
        </Box>
        <Box width='34px'>
          {show && <DownloadableFileAction file={file} id={id} />}
        </Box>
      </StyledPostBox>
    </Fragment>
  );
};
export default DownloadableFile;
