import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Modal,
  Toolbar,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import DescriptionField from '../forms/DescriptionField';

import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../lib/axiosConfig';
import { StyledModalBox } from '../global';
import {
  addDescription,
  getCompanyInfo,
  getRoomInfo,
} from '../../features/companies/companiesSlice';

const CreateDescription = ({ type }) => {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  const roomInfo = useSelector(getCompanyInfo);

  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { id: room_id, description: '' },
  });

  useEffect(() => {
    dispatch(getRoomInfo(room_id)).unwrap();
  }, [room_id, dispatch]);

  useEffect(() => {
    setValue('description', roomInfo?.description ?? '');
  }, [roomInfo?.description, setValue]);

  // handle modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleFormSubmit = (data) => {
    axios
      .put(`api/companies/${data.id}`, data, options)
      .then((res) => {
        if (res.data?.room) {
          dispatch(
            addDescription({ description: res.data?.room?.description })
          );
          setValue('description', res.data?.room?.description);
        }
      })
      .catch((err) => console.error(err))
      .finally(() =>
        setTimeout(() => {
          handleClose();
        }, 500)
      );
  };

  return (
    <Fragment>
      {type === 'add' ? (
        <Button startIcon={<AddIcon />} onClick={handleOpen} color='info'>
          Add
        </Button>
      ) : (
        <Button startIcon={<EditIcon />} onClick={handleOpen} color='info'>
          Edit
        </Button>
      )}

      {/* modal */}
      <Modal
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
            mb: 1,
          }}
        >
          <Toolbar
            sx={{ display: 'flex', justifyContent: 'center' }}
            disableGutters
          >
            <Typography variant='h6' component='h6' fontWeight={700}>
              Create company description
            </Typography>
          </Toolbar>

          {/* Description of the Room */}
          <DescriptionField
            name='description'
            label='Description'
            register={register}
            watch={watch}
            message={`provide a description according to what the company is looking for`}
          />

          {progress > 0 && (
            <Box sx={{ width: '100%', alignSelf: 'flex-start' }}>
              <LinearProgress
                variant='determinate'
                color='success'
                value={progress}
              />
            </Box>
          )}

          <Divider flexItem sx={{ bgcolor: '#000000', height: 1.2, mb: 2 }} />

          {/* submit changes */}
          <Button
            variant='contained'
            onClick={handleSubmit(handleFormSubmit)}
            type='submit'
            sx={{ marginX: 'auto' }}
            {...(progress > 0 && { disabled: true })}
          >
            Create
          </Button>
        </StyledModalBox>
      </Modal>
    </Fragment>
  );
};
export default CreateDescription;
