import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';

const initialState = {
  tasks: [],
  task: {},
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.task = {};
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
        console.log(action.payload);
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
            for (let i = 0; i < FILES_SIZE; i++) {
              file_name[i] = action.payload?.s_files[i].filename;
            }

            action.payload.task.s_filename = file_name;
          }

          if (action.payload.submitted_on) {
            action.payload.task.submitted_on = action.payload.submitted_on;
          }

          state.task = action.payload.task;
        }
      })
      .addCase(undoSubmitTask.fulfilled, (state, action) => {
        state.task = { ...state.task, s_task: action.payload.s_task };
      });
  },
});

export const selectAllTasks = (state) => state.tasks.tasks;
export const getTaskById = (state) => state.tasks.task;

export const { addNewTask, submitTask } = tasksSlice.actions;

export default tasksSlice.reducer;
