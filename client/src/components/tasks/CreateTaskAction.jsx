import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  LinearProgress,
  Modal,
  OutlinedInput,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axios from '../../lib/axiosConfig';
import moment from 'moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { StyledPostBox, StyledModalBox } from '../global';
import { getUserInfo } from '../../features/users/usersSlice';
import { addNewTask } from '../../features/tasks/tasksSlice';
import { AssignedUser } from './AssignedUser';
import { AuthContext } from '../../lib/authContext';

const CreateTaskAction = ({ members }) => {
  const { socket } = useContext(AuthContext);

  const dispatch = useDispatch();
  const user = useSelector(getUserInfo);

  const { pathname } = useLocation();
  const room_id = pathname.slice(6).slice(0, 24);

  const [open, setOpen] = useState(false);
  const [openAssignTo, setOpenAssignTo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [membersOnly, setMembersOnly] = useState([]);
  const [checked, setChecked] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      ref_files: [],
      assignedTo: [],
      createdBy: '',
      company_id: '',
      dueDate: moment(),
      closesDate: moment(),
    },
  });

  const handleChange = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    if (user?._id && room_id) {
      setValue('createdBy', user?._id);
      setValue('company_id', room_id);
    }
  }, [user?._id, room_id, setValue]);

  useEffect(() => {
    const m = members?.filter((member) => member.roles === 'member');
    let property = {};

    for (let i = 0; i < m?.length; i++) {
      const propName = m?.[i].id;
      property[propName] = false;
    }

    setMembersOnly(m);
    setChecked(property);
  }, [members]);

  // handle modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // handle modal
  const handleOpenAssignTo = () => setOpenAssignTo(true);
  const handleCloseAssignTo = () => setOpenAssignTo(false);

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
    const { title, description, createdBy, company_id, dueDate, closesDate } =
      data;

    let assigned_id = [];
    const fd = new FormData();

    for (let [key, value] of Object.entries(checked)) {
      if (value) assigned_id.push(key);
    }

    data.assignedTo = assigned_id;

    if (data.assignedTo.length === 0) {
      handleOpenAssignTo();
    } else {
      const list_of_files = Array.from(data.ref_files);

      if (list_of_files?.length > 0) {
        const fileListArr = [...data.ref_files];
        fileListArr.splice(6);

        for (const file of fileListArr) {
          fd.append('ref_files', file);
        }
      }

      fd.append('title', title);
      fd.append('description', description);

      for (const user_id of data.assignedTo) {
        fd.append('assignedTo', user_id);
      }

      fd.append('createdBy', createdBy);
      fd.append('company_id', company_id);
      fd.append('dueDate', dueDate);
      fd.append('closesDate', closesDate);

      // create task with axios
      axios
        .post('api/tasks', fd, options)
        .then((res) => {
          if (res.data?.task && res.data?.user?.[0]) {
            dispatch(addNewTask(res.data));

            socket?.current?.emit('send_notif', res?.data);
          }
        })
        .catch((err) => console.error(err))
        .finally(() =>
          setTimeout(() => {
            handleClose();
            reset({
              title: '',
              description: '',
              ref_files: [],
              assignedTo: [],
              createdBy: user?._id,
              company_id: room_id,
              dueDate: moment(),
              closesDate: moment(),
            });
          }, 500)
        );
    }
  };

  const to_Array = Array.from(watch('ref_files'));
  const get_file = to_Array?.map((e, index) => {
    let prefix, ellipsis, suffix;
    if (e.name.length >= 33) {
      prefix = e.name.substring(0, 16);
      ellipsis = '...';
      suffix = e.name.substring(e.name.length - 14);
    }

    return (
      <Fragment key={index}>
        {e.name.length >= 35 ? (
          <StyledPostBox>{prefix + ellipsis + suffix}</StyledPostBox>
        ) : (
          <StyledPostBox>{e.name}</StyledPostBox>
        )}
      </Fragment>
    );
  });

  return (
    <Fragment>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          variant='contained'
          startIcon={<EditIcon />}
          sx={{ textTransform: 'capitalize', mb: 2 }}
          onClick={handleOpen}
        >
          Create Task
        </Button>
      </Box>
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
          className='comment'
        >
          <Toolbar
            sx={{ display: 'flex', justifyContent: 'center' }}
            disableGutters
          >
            <Typography variant='h6' component='h6' fontWeight={700}>
              Create new task
            </Typography>
          </Toolbar>

          {/* content of the task */}
          {/* Title */}
          <FormControl
            variant='outlined'
            fullWidth
            required
            sx={{ mb: 1.5 }}
            {...(errors.title?.message && { error: true })}
          >
            <InputLabel htmlFor='Title'>Title</InputLabel>
            <OutlinedInput
              autoComplete='off'
              id='Title'
              type='text'
              label='Title'
              value={watch('title')}
              {...register('title', { required: 'This field is required' })}
            />
            <FormHelperText id='Title'>
              {errors.title?.message ?? 'Write a title of the task'}
            </FormHelperText>
          </FormControl>

          {/* Description */}
          <FormControl variant='outlined' fullWidth sx={{ mb: 1 }}>
            <InputLabel htmlFor='Description'>Description</InputLabel>
            <OutlinedInput
              className='comment'
              autoComplete='off'
              id='Description'
              type='text'
              label='Description'
              multiline
              rows={3}
              value={watch('description')}
              {...register('description')}
            />
            <FormHelperText id='Description'>
              Write a description of the task (optional)
            </FormHelperText>
          </FormControl>

          {/* Reference Materials: */}
          <Stack
            justifyContent='flex-start'
            flexDirection='column'
            alignItems='flex-start'
            width='100%'
            mb={1}
          >
            <Typography variant='subtitle2' ml={1} display='inline'>
              Reference Materials:
              <Typography
                variant='subtitle2'
                component='p'
                ml={1}
                display='inline'
                sx={{ color: '#dc3545' }}
              >
                Max 6 files
              </Typography>
            </Typography>

            <Box
              mb={0.5}
              width='100%'
              className='comment'
              sx={{
                maxHeight: 150,
                overflow: 'auto',
                '> div': {
                  mb: 0.5,
                },
              }}
            >
              {get_file}
            </Box>

            <Button
              variant='outlined'
              component='label'
              startIcon={<AddIcon />}
              sx={{ textTransform: 'capitalize' }}
            >
              Add File
              <input
                hidden
                multiple
                name='ref_files'
                type='file'
                accept='.doc,.docx,.pdf,image/*'
                {...register('ref_files')}
              />
            </Button>
          </Stack>

          {/* Assigned to */}
          <Fragment>
            <Accordion sx={{ bgcolor: '#f2f2f2', mb: 1, width: '100%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography>Assigned To</Typography>
              </AccordionSummary>
              <AccordionDetails
                className='comment'
                sx={{ maxHeight: 100, overflowY: 'auto' }}
              >
                <Typography>
                  {AssignedUser({ membersOnly, checked })}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Box display='flex' justifyContent='space-between' width='100%'>
              <Button
                variant='outlined'
                startIcon={<EditIcon />}
                sx={{ textTransform: 'capitalize', mb: 2 }}
                onClick={handleOpenAssignTo}
              >
                Assign To
              </Button>
            </Box>
            <Modal
              open={openAssignTo}
              onClose={handleCloseAssignTo}
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
                    Assign member
                  </Typography>
                </Toolbar>

                <FormGroup
                  className='comment'
                  sx={{ width: '100%', maxHeight: 400, overflowX: 'auto' }}
                >
                  {membersOnly?.map((m, index) => {
                    let checked_prop;
                    let prop_key;
                    for (let [key, value] of Object.entries(checked)) {
                      if (value && key === m.id) {
                        checked_prop = key;
                      }
                      if (key === m.id) prop_key = key;
                    }

                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={checked[checked_prop] || false}
                            name={prop_key}
                            onChange={handleChange}
                          />
                        }
                        label={m?.name}
                      />
                    );
                  })}
                </FormGroup>

                <Divider
                  flexItem
                  sx={{ bgcolor: '#000000', height: 1.2, mb: 2 }}
                />

                {/* submit changes */}
                <Button
                  variant='contained'
                  onClick={handleCloseAssignTo}
                  type='submit'
                  sx={{ marginX: 'auto' }}
                >
                  Save
                </Button>
              </StyledModalBox>
            </Modal>
          </Fragment>

          {/* Due Date */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(params) => (
                <TextField {...params} fullWidth sx={{ m: 1 }} />
              )}
              label='Due Date'
              value={watch('dueDate')}
              onChange={(date) => {
                setValue('dueDate', date);
              }}
            />
          </LocalizationProvider>

          {/* Closes Date */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(params) => (
                <TextField {...params} fullWidth sx={{ m: 1 }} />
              )}
              label='Closes Date'
              value={watch('closesDate')}
              onChange={(date) => {
                setValue('closesDate', date);
              }}
            />
          </LocalizationProvider>

          {/* progress bar */}
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
export default CreateTaskAction;
