import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  //   CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  LinearProgress,
  Modal,
  OutlinedInput,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../lib/axiosConfig';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';

import { StyledModalBox } from '../global';
import { getCompanyInfo } from '../../features/companies/companiesSlice';
import { AssignedUser } from './AssignedUser';
import { updateTask } from '../../features/tasks/tasksSlice';

const UpdateTask = ({ task, handleUpdateModalClose }) => {
  const [openAssignTo, setOpenAssignTo] = useState(false);
  const [membersOnly, setMembersOnly] = useState([]);
  const [checked, setChecked] = useState({});
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  const roomInfo = useSelector(getCompanyInfo);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      id: '',
      title: '',
      description: '',
      assignedTo: [],
      dueDate: Date,
      closesDate: Date,
    },
  });

  const handleChange = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
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

  // handle modal
  const handleOpenAssignTo = () => setOpenAssignTo(true);
  const handleCloseAssignTo = () => setOpenAssignTo(false);

  useEffect(() => {
    if (task?._id) {
      setValue('id', task?._id);
      setValue('title', task?.title);
      setValue('description', task?.description);
      setValue('assignedTo', task?.assignedTo);
      setValue('dueDate', task?.date?.due);
      setValue('closesDate', task?.date?.closes);
    }
  }, [
    task?._id,
    task?.title,
    task?.description,
    task?.assignedTo,
    task?.date?.due,
    task?.date?.closes,
    setValue,
  ]);

  // assign value to membersOnly and checked
  // update which user is assign
  useEffect(() => {
    if (roomInfo?.members?.length > 0) {
      const m = roomInfo?.members?.filter(
        (member) => member.roles === 'member'
      );
      let property = {};

      for (let i = 0; i < m.length; i++) {
        const propName = m[i].id;

        if (task?.assignedTo?.length > 0) {
          const isUserAssigned = task?.assignedTo?.some((e) => e === propName);

          if (isUserAssigned) {
            property[propName] = true;
          } else {
            property[propName] = false;
          }
        }
      }

      setMembersOnly(m);
      setChecked(property);
    }
  }, [roomInfo?.members, task?.assignedTo]);

  const handleFormSubmit = (data) => {
    let assigned_id = [];

    for (let [key, value] of Object.entries(checked)) {
      if (value) assigned_id.push(key);
    }

    data.assignedTo = assigned_id;

    if (data.assignedTo.length === 0) {
      handleOpenAssignTo();
    } else {
      // update task with axios
      axios
        .put(`api/tasks/${data.id}`, data, options)
        .then((res) => {
          if (res.data?.task) {
            dispatch(updateTask(res.data));
          }
        })
        .catch((err) => console.error(err))
        .finally(() =>
          setTimeout(() => {
            reset({
              id: '',
              title: '',
              description: '',
              assignedTo: [],
              dueDate: Date,
              closesDate: Date,
            });
            handleUpdateModalClose();
          }, 500)
        );
    }
  };

  return (
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
          Update task
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
            <Typography>{AssignedUser({ membersOnly, checked })}</Typography>
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

            <Divider flexItem sx={{ bgcolor: '#000000', height: 1.2, mb: 2 }} />

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
        Save
      </Button>
    </StyledModalBox>
  );
};
export default UpdateTask;
