import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import axios from '../../lib/axiosConfig';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../../lib/authContext';
import {
  DownloadableFile,
  StyledPostBox,
  StyledTypography2,
  TimeAgo,
} from '../global';
import {
  getSubmittedTask,
  getSubmittedTasks,
  submitTask,
  undoSubmitTask,
} from '../../features/tasks/tasksSlice';
import { DateFormatter, isDatePast } from '../../lib/DateFormatter';
import avatarTheme from '../../lib/avatar';
import TaskClickAwayHandler from './TaskClickAwayHandler';
import TasksRow from './TasksRow';

const SingleTaskCard = ({ task }) => {
  const { _user } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);
  const [isTaskSubmitted, setIsTaskSubmitted] = useState(false);

  const dispatch = useDispatch();
  const get_submitted_task = useSelector(getSubmittedTask);

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      id: '',
      user_id: '',
      ref_files: [],
    },
  });

  useEffect(() => {
    if (_user?._id && task?._id) {
      setValue('user_id', _user?._id);
      setValue('id', task?._id);
    }
  }, [_user?._id, task?._id, setValue]);

  useEffect(() => {
    if (task?.s_task) {
      setIsTaskSubmitted(task?.s_task);
    }
  }, [task?.s_task]);

  useEffect(() => {
    if (task?.company_id && task?._id) {
      dispatch(
        getSubmittedTasks({ company_id: task?.company_id, id: task?._id })
      );
    }
  }, [task?.company_id, task?._id, dispatch]);

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
    const { id, user_id } = data;
    const fd = new FormData();

    const list_of_files = Array.from(data.ref_files);

    if (list_of_files?.length > 0) {
      const fileListArr = [...data.ref_files];
      fileListArr.splice(6);

      for (const file of fileListArr) {
        fd.append('ref_files', file);
      }
    }

    fd.append('id', id);
    fd.append('user_id', user_id);

    // post it with axios
    axios
      .post(`api/tasks/submit`, fd, options)
      .then((res) => {
        if (res.data?.task && res.data.msg === 'success') {
          dispatch(submitTask(res.data));
        }
      })
      .catch((err) => console.error(err))
      .finally(() =>
        setTimeout(() => {
          reset({
            id: task?._id,
            user_id: _user?._id,
            ref_files: [],
          });
        }, 500)
      );
  };

  const to_Array = Array.from(watch('ref_files'));
  const get_file = to_Array?.map((e, index) => {
    return (
      <Fragment key={index}>
        <StyledPostBox>{e.name}</StyledPostBox>
      </Fragment>
    );
  });

  // get reference file
  const get_ref_file = task?.filename?.map((name, index) => {
    return (
      <Fragment key={index}>
        <DownloadableFile file={name} id={task?.ref_files?.[index]} />
      </Fragment>
    );
  });

  // get submitted file
  const get_s_file = task?.s_filename?.map((name, index) => {
    return (
      <Fragment key={index}>
        <DownloadableFile file={name} id={task?.s_file_id?.[index]} />
      </Fragment>
    );
  });

  const check_date = task?.date?.due && task?.date?.closes;
  const checkClosesDate = isDatePast(task?.date?.closes);
  const isTaskClosed = check_date && checkClosesDate;

  return (
    <Fragment>
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: avatarTheme({
                  name: task?.name?.[0]?.toLowerCase(),
                }),
              }}
              aria-label='recipe'
            >
              {task?.name?.[0]?.toUpperCase()}
            </Avatar>
          }
          action={
            _user?._id === task?.createdBy ? (
              <TaskClickAwayHandler task={task} />
            ) : undefined
          }
          title={task?.name}
          subheader={<TimeAgo timestamp={task?.updatedAt} />}
        />
        <CardContent
          sx={{
            px: 3,
            py: 0,
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {isTaskClosed ? (
            <Fragment>
              <Typography
                variant='body2'
                fontWeight={700}
                sx={{ color: '#dc3545' }}
              >
                Due {task?.date?.due && DateFormatter(task?.date?.due)}
              </Typography>
              <Typography
                variant='body2'
                fontWeight={700}
                sx={{ color: '#dc3545' }}
              >
                Closes {task?.date?.closes && DateFormatter(task?.date?.closes)}
              </Typography>
            </Fragment>
          ) : (
            <Fragment>
              <Typography variant='body2' fontWeight={700}>
                Due {task?.date?.due && DateFormatter(task?.date?.due)}
              </Typography>
              <Typography variant='body2' fontWeight={700}>
                Closes {task?.date?.closes && DateFormatter(task?.date?.closes)}
              </Typography>
            </Fragment>
          )}
        </CardContent>

        <CardContent
          sx={{
            px: 3,
            py: 0,
          }}
        >
          {/* title */}
          <Typography variant='body1' fontWeight={700} mb={2}>
            {task?.title}
          </Typography>

          {/* description */}
          {task?.description && (
            <StyledTypography2 variant='body1' component='pre'>
              {task?.description}
            </StyledTypography2>
          )}

          {/* reference material - optional */}
          {task?.filename && (
            <Fragment>
              <Typography variant='body1' fontWeight={500} mb={0.5}>
                Reference Materials:
              </Typography>

              {/* list of reference files */}
              <Box
                mb={1.5}
                width='100%'
                className='comment'
                sx={{
                  overflow: 'auto',
                  '> div': {
                    mb: 0.5,
                  },
                }}
              >
                {get_ref_file}
              </Box>
            </Fragment>
          )}

          {_user?.employeeInfo ? null : (
            <Fragment>
              {isTaskClosed ? (
                <Typography
                  variant='body1'
                  fontWeight={700}
                  sx={{ color: '#dc3545' }}
                >
                  Task Closed
                </Typography>
              ) : (
                <Fragment>
                  {/* my work */}
                  {isTaskSubmitted ? (
                    <Stack
                      justifyContent='flex-start'
                      flexDirection='column'
                      alignItems='flex-start'
                      width='100%'
                      mb={1.5}
                    >
                      <Typography
                        display='inline'
                        variant='body1'
                        component='div'
                        fontWeight={500}
                        mb={0.5}
                      >
                        My Work:
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
                          overflow: 'auto',
                          '> div': {
                            mb: 0.5,
                          },
                        }}
                      >
                        {get_s_file}
                      </Box>
                    </Stack>
                  ) : (
                    <Stack
                      justifyContent='flex-start'
                      flexDirection='column'
                      alignItems='flex-start'
                      width='100%'
                      mb={1.5}
                    >
                      <Typography
                        display='inline'
                        variant='body1'
                        component='div'
                        fontWeight={500}
                        mb={0.5}
                      >
                        My Work:
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
                  )}

                  {/* progress bar */}
                  {progress > 0 && (
                    <Box
                      sx={{ width: '100%', alignSelf: 'flex-start', mb: 1.5 }}
                    >
                      <LinearProgress
                        variant='determinate'
                        color='success'
                        value={progress}
                      />
                    </Box>
                  )}

                  {isTaskSubmitted ? (
                    <Box
                      display='flex'
                      flexDirection={{ xs: 'column', sm: 'row' }}
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                      justifyContent='space-between'
                      mt={5}
                    >
                      <Typography
                        variant='body2'
                        fontWeight={700}
                        fontStyle='italic'
                        mb={{ xs: 1, sm: 0 }}
                      >
                        Submitted on{' '}
                        {task?.submitted_on &&
                          DateFormatter(task?.submitted_on)}
                      </Typography>
                      <Button
                        variant='contained'
                        color='secondary'
                        sx={{ px: '23px' }}
                        // if click the undo, delete the file that has been submitted
                        onClick={() => {
                          dispatch(
                            undoSubmitTask({
                              id: task?._id,
                              user_id: _user?._id,
                            })
                          );
                          setIsTaskSubmitted(false);
                        }}
                        {...(progress > 0 && { disabled: true })}
                      >
                        Undo
                      </Button>
                    </Box>
                  ) : (
                    <Box mt={5}>
                      <Button
                        variant='outlined'
                        sx={{ px: '23px' }}
                        onClick={handleSubmit(handleFormSubmit)}
                        {...(progress > 0 && { disabled: true })}
                      >
                        Submit
                      </Button>
                    </Box>
                  )}
                </Fragment>
              )}
            </Fragment>
          )}
        </CardContent>
      </Card>

      {/* list of submitted task */}
      {_user?.employeeInfo && (
        <TableContainer component={Paper}>
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date Submitted</TableCell>
                <TableCell align='right' />
              </TableRow>
            </TableHead>
            <TableBody>
              {get_submitted_task?.submitted_by?.map((row) => (
                <TasksRow key={row?.user_id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Fragment>
  );
};
export default SingleTaskCard;
