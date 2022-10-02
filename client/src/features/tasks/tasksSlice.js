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
  },
  extraReducers(builder) {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.task = {};
      if (action.payload.tasks.length > 0 && action.payload.users.length > 0) {
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
    });
  },
});

export const selectAllTasks = (state) => state.tasks.tasks;

export const { addNewTask } = tasksSlice.actions;

export default tasksSlice.reducer;
