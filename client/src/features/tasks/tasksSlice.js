import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';
import { isDatePast } from '../../lib/DateFormatter';

const initialState = {
  tasks: [],
  task: {},
  pending_tasks: [],
  completed_tasks: [],
  submitted_tasks: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get the tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (initialState) => {
    try {
      const { company_id } = initialState;

      const response = await axios.get(`api/tasks/${company_id}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// select single task
export const selectSingleTask = createAsyncThunk(
  'tasks/selectSingleTask',
  async (initialState) => {
    try {
      const { id, user_id, company_id } = initialState;

      const response = await axios.get(
        `api/tasks/${company_id}/${user_id}/${id}`
      );

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// undo and delete file in task
export const undoSubmitTask = createAsyncThunk(
  'tasks/undoSubmitTask',
  async (initialState) => {
    try {
      const { id, user_id } = initialState;

      const response = await axios.delete(`api/tasks/${id}/${user_id}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// get submitted files
export const getSubmittedTasks = createAsyncThunk(
  'tasks/getSubmittedTasks',
  async (initialState) => {
    try {
      const { company_id, id } = initialState;

      const response = await axios.get(`api/tasks/${id}/${company_id}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      if (action.payload?.task && action.payload?.user?.[0]) {
        action.payload.task.name = action.payload?.user[0]?.name;
        // if (action.payload?.filename) {
        //   action.payload.task.filename = action.payload?.filename;
        // }
        state.tasks.push(action.payload.task);
      }
    },
    submitTask: (state, action) => {
      if (action.payload?.task) {
        action.payload.task.s_task = action.payload.s_task;

        if (action.payload?.filename?.length > 0) {
          action.payload.task.s_filename = action.payload?.filename;
        }

        if (action.payload.submitted_on) {
          action.payload.task.submitted_on = action.payload.submitted_on;
        }

        action.payload.task.name = state.task?.name;
        action.payload.task.filename = state.task?.filename;

        state.task = action.payload.task;
      }
    },
    updateTask: (state, action) => {
      if (action.payload?.task) {
        const {
          assignedTo,
          company_id,
          createdAt,
          createdBy,
          date: { closes, due },
          description,
          submitted_by,
          title,
          updatedAt,
          _id,
        } = action.payload.task;

        state.task = {
          ...state.task,
          assignedTo,
          company_id,
          createdAt,
          createdBy,
          date: { closes, due },
          description,
          submitted_by,
          title,
          updatedAt,
          _id,
        };
      }
    },
    pendingTasks: (state, action) => {
      const filter_dates = state.tasks?.filter(
        (task) => isDatePast(task?.date?.closes) === false
      );

      let tasksList = [];
      for (const task of filter_dates) {
        if (task?.submitted_by?.length > 0) {
          const task_is_pending = task?.submitted_by?.some(
            (e) => e.user_id === action.payload
          );
          if (!task_is_pending) {
            tasksList?.push(task);
          }
        } else {
          tasksList?.push(task);
        }
      }

      state.pending_tasks = tasksList;
    },
    completedTasks: (state, action) => {
      let tasksList = [];
      for (const task of state.tasks) {
        if (task?.submitted_by?.length > 0) {
          const task_is_complete = task?.submitted_by?.some(
            (e) => e.user_id === action.payload
          );
          if (task_is_complete) {
            tasksList?.push(task);
          }
        } else if (isDatePast(task?.date?.closes)) {
          tasksList?.push(task);
        }
      }

      state.completed_tasks = tasksList;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.task = {};
        state.submitted_tasks = {};
        if (
          action.payload.tasks.length > 0 &&
          action.payload.users.length > 0
        ) {
          state.tasks = action.payload.tasks;

          const TASKS_SIZE = action.payload.tasks.length;
          const USERS_SIZE = action.payload.users.length;
          //   const FILES_SIZE = action.payload?.files?.length;

          const tasks = action.payload?.tasks;
          const users = action.payload?.users;
          //   const files = action.payload?.files;

          for (let i = 0; i < TASKS_SIZE; i++) {
            for (let j = 0; j < USERS_SIZE; j++) {
              if (tasks[i].createdBy === users[j]._id) {
                state.tasks[i].name = users[j].name;
              }
            }
          }

          //     for (let i = 0; i < POSTS_SIZE; i++) {
          //       for (let j = 0; j < FILES_SIZE; j++) {
          //         if (posts[i].file_id === files[j]._id) {
          //           state.posts[i].filename = files[j].filename;
          //         }
          //       }
          //     }
        } else {
          state.tasks = [];
        }
      })
      .addCase(selectSingleTask.fulfilled, (state, action) => {
        state.submitted_tasks = {};
        if (action.payload.task && action.payload?.user?.[0]) {
          const { name } = action.payload.user[0];

          action.payload.task.name = name;
          action.payload.task.s_task = action.payload.s_task;

          // ref_files
          if (action.payload?.files?.length > 0) {
            const FILES_SIZE = action.payload?.files.length;

            let file_name = [];
            for (let i = 0; i < FILES_SIZE; i++) {
              file_name[i] = action.payload?.files[i].filename;
            }

            action.payload.task.filename = file_name;
          }

          // submitted files by user
          if (action.payload?.s_files?.length > 0) {
            const FILES_SIZE = action.payload?.s_files.length;

            let file_name = [];
            let file_id = [];
            for (let i = 0; i < FILES_SIZE; i++) {
              file_name[i] = action.payload?.s_files[i].filename;
              file_id[i] = action.payload?.s_files[i]._id;
            }

            action.payload.task.s_filename = file_name;
            action.payload.task.s_file_id = file_id;
          }

          if (action.payload.submitted_on) {
            action.payload.task.submitted_on = action.payload.submitted_on;
          }

          state.task = action.payload.task;
        }
      })
      .addCase(undoSubmitTask.fulfilled, (state, action) => {
        state.task = { ...state.task, s_task: action.payload.s_task };
      })
      .addCase(getSubmittedTasks.fulfilled, (state, action) => {
        if (action.payload.task && action.payload?.sub_task) {
          const { task, users, sub_task, files } = action.payload;

          state.submitted_tasks = task;

          const USERS_SIZE = users?.length;
          const SUBTASKS_SIZE = sub_task?.length;
          const FILES_SIZE = files?.length;
          const SUBMITTED_BY_SIZE = task?.submitted_by?.length;

          for (let i = 0; i < SUBMITTED_BY_SIZE; i++) {
            for (let j = 0; j < USERS_SIZE; j++) {
              if (task?.submitted_by[i]?.user_id === users[j]?._id) {
                state.submitted_tasks.submitted_by[i].name = users[j]?.name;
              }
            }
          }

          for (let i = 0; i < SUBMITTED_BY_SIZE; i++) {
            for (let j = 0; j < SUBTASKS_SIZE; j++) {
              if (
                task?.submitted_by[i]?.submitted_task_id === sub_task[j]?._id
              ) {
                state.submitted_tasks.submitted_by[i].filename = [];
                state.submitted_tasks.submitted_by[i].id = [];

                //  find each file
                for (const file of sub_task[j]?.files) {
                  for (let k = 0; k < FILES_SIZE; k++) {
                    if (file === files?.[k]?._id) {
                      state.submitted_tasks.submitted_by[i].filename.push(
                        files[k]?.filename
                      );
                      state.submitted_tasks.submitted_by[i].id.push(file);
                    }
                  }
                }
              }
            }
          }
        }
      });
  },
});

export const selectAllTasks = (state) => state.tasks.tasks;
export const getTaskById = (state) => state.tasks.task;
export const getPendingTasks = (state) => state.tasks.pending_tasks;
export const getCompletedTasks = (state) => state.tasks.completed_tasks;
export const getSubmittedTask = (state) => state.tasks.submitted_tasks;

export const {
  addNewTask,
  completedTasks,
  pendingTasks,
  submitTask,
  updateTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
