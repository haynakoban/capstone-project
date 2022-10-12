import { Fragment, useContext, useState } from 'react';
import axios from '../../lib/axiosConfig';
import {
  Box,
  Button,
  // FormControl,
  // FormHelperText,
  IconButton,
  LinearProgress,
  // InputLabel,
  // MenuItem,
  Modal,
  // Select,
  Toolbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StyledModalBox } from '../global';
import { AuthContext } from '../../lib/authContext';
import { deleteFile } from '../../features/files/filesSlice';
import { useDispatch } from 'react-redux';

const ApplyInternship = ({ id }) => {
  const { _user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [hasCompany, setHasCompany] = useState(false);
  const [file, setFile] = useState(null);
  const [fileDeleted, setFileDeleted] = useState(false);
  const [progress, setProgress] = useState(0);

  // handle modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFileDeleted(false);
    setOpen(false);
  };

  const options = {
    onUploadProgress: (p) => {
      const { loaded, total } = p;
      let precentage = Math.floor((loaded * 100) / total);
      setProgress(Math.floor((loaded * 100) / total));

      if (precentage === 100) {
        setTimeout(() => {
          setProgress(0);
        }, 1000);
      }
    },
  };

  const handleSubmit = () => {
    if (_user?.internInfo?.companyInfo?.hasCompany) {
      setHasCompany(true);
    } else {
      setHasCompany(false);
      const fd = new FormData();
      fd.append('file', file, file?.name);
      fd.append('user_id', _user?._id);
      fd.append('company_id', id);

      axios
        .post(`api/users/uploads`, fd, options)
        .then(async (res) => {
          if (res.data?.err) {
            const result = await dispatch(
              deleteFile(res.data?.file_id)
            ).unwrap();

            if (result?.msg) {
              setFileDeleted(true);
            }
          }
        })
        .catch((err) => console.error(err))
        .finally(() =>
          setTimeout(() => {
            handleClose();
          }, 2000)
        );
    }
  };

  return (
    <Fragment>
      <Button variant='contained' color='success' onClick={handleOpen}>
        Apply
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <StyledModalBox
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              px: 1,
            }}
            disableGutters
          >
            <Typography variant='h6' component='h6' fontWeight={700}>
              Attach your file
            </Typography>
            <IconButton edge='end' onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <blockquote className='blockquote fs-6'>
            Note: you can use your file under your resume settings, or attach a
            new file directly in the input tag.
            <blockquote className='blockquote fs-6'>
              If both files were send, the one in your resume settings will be
              upload.
            </blockquote>
          </blockquote>
          {/* <FormControl sx={{ m: 1 }} required>
            <InputLabel id='Select Your File'>Select Your File</InputLabel>
            <Select
              labelId='Select Your File'
              id='Select Your File'
              label='Select Your File'
            >
              <MenuItem value='resume'>Resume</MenuItem>
              <MenuItem value='cv'>CV</MenuItem>
              <MenuItem value='Application Letter'>Application Letter</MenuItem>
            </Select>
            <FormHelperText id='Select Your File'>
              This allow you to keep the room private. if you wish to show it
              the public. Select the public.
            </FormHelperText>
          </FormControl> */}
          {/* file upload */}
          <div className='mb-3'>
            <label htmlFor='formFile' className='form-label'>
              Attach file
            </label>
            <input
              className='form-control'
              type='file'
              id='formFile'
              name='file'
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>

          {fileDeleted && (
            <blockquote className='blockquote fs-6 text-danger'>
              You have already applied here
            </blockquote>
          )}

          {hasCompany && (
            <blockquote className='blockquote fs-6 text-danger'>
              You already have company
            </blockquote>
          )}

          {progress > 0 && (
            <Box sx={{ width: '100%', alignSelf: 'flex-start' }}>
              <LinearProgress
                variant='determinate'
                color='success'
                value={progress}
              />
            </Box>
          )}

          {/* submit changes */}
          <Button
            variant='contained'
            onClick={handleSubmit}
            type='submit'
            sx={{ marginX: 'auto', mt: 2 }}
          >
            Upload
          </Button>
        </StyledModalBox>
      </Modal>
    </Fragment>
  );
};
export default ApplyInternship;
