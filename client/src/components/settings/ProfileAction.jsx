import { Fragment, useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  Modal,
  OutlinedInput,
  Toolbar,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { StyledModalBox } from '../global';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserInfo,
  updateUserProfileInfo,
} from '../../features/users/usersSlice';
import { useEffect } from 'react';

const ProfileAction = () => {
  const user = useSelector(getUserInfo);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    name: '',
    address: '',
    gender: '',
  });

  useEffect(() => {
    setValues({
      name: user?.name ? user?.name : '',
      address: user?.address ? user?.address : '',
      gender: user?.gender ? user?.gender : '',
    });
  }, [user?.name, user?.address, user?.gender]);

  // handle modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // handle change
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleFormSubmit = async () => {
    const { name, address, gender } = values;

    if (!name) setError(true);
    else {
      setError(false);

      dispatch(
        updateUserProfileInfo({
          _id: user?._id,
          name,
          address,
          gender,
          isIntern: user?.isIntern,
        })
      ).unwrap();
      setValues({
        name: '',
        address: '',
        gender: '',
      });

      handleClose();
    }
  };

  return (
    <Fragment>
      <IconButton size='small' onClick={handleOpen}>
        <EditIcon />
      </IconButton>
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
          }}
        >
          <Toolbar
            sx={{ display: 'flex', justifyContent: 'center' }}
            disableGutters
          >
            <Typography variant='h6' component='h6' fontWeight={700}>
              Edit Your Profile
            </Typography>
          </Toolbar>

          {/* User Information */}
          {/* full name field */}
          <FormControl
            variant='outlined'
            fullWidth
            sx={{ mb: 2 }}
            required
            {...(error && { error: true })}
          >
            <InputLabel htmlFor='Full Name'>Full Name</InputLabel>
            <OutlinedInput
              autoComplete='off'
              id='Full Name'
              type='text'
              label='Full Name'
              value={values.name}
              onChange={handleChange('name')}
            />
            <FormHelperText id='Full Name'>
              {error ? 'this field is required' : 'change your full name here'}
            </FormHelperText>
          </FormControl>

          {/* gender field */}
          <FormControl variant='outlined' fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor='Gender'>Gender</InputLabel>
            <OutlinedInput
              autoComplete='off'
              id='Gender'
              type='text'
              label='Gender'
              value={values.gender}
              onChange={handleChange('gender')}
            />
            <FormHelperText id='Gender'>
              ex: Male, Female, Gay, Transgender, etc.
            </FormHelperText>
          </FormControl>

          {/* address field */}
          <FormControl variant='outlined' fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor='Address'>Address</InputLabel>
            <OutlinedInput
              autoComplete='off'
              id='Address'
              type='text'
              label='Address'
              value={values.address}
              onChange={handleChange('address')}
            />
            <FormHelperText id='Address'>
              ex: San Roque, Tarlac City
            </FormHelperText>
          </FormControl>

          {/* submit changes */}
          <Button
            variant='contained'
            onClick={handleFormSubmit}
            type='submit'
            sx={{ marginX: 'auto' }}
          >
            Save
          </Button>
        </StyledModalBox>
      </Modal>
    </Fragment>
  );
};
export default ProfileAction;
