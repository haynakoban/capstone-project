import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';

const initialState = {
  notifications: [],
  notification: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// select the list of notifications
export const selectAllNotification = createAsyncThunk(
  'files/selectAllNotification',
  async (initialState) => {
    try {
      const response = await axios.get(`api/notifications/${initialState}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(selectAllNotification.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload.notifs && action.payload.users) {
        const { notifs, users, tasks } = action.payload;

        state.notifications = notifs;

        const NOTIFS_SIZE = notifs?.length;
        const USERS_SIZE = users?.length;
        const TASKS_SIZE = tasks?.length;

        // assign user
        for (let i = 0; i < NOTIFS_SIZE; i++) {
          for (let j = 0; j < USERS_SIZE; j++) {
            if (notifs[i].createdBy === users[j]._id) {
              state.notifications[i].name = users[j].name;
            }
          }
        }

        // assign task name
        for (let i = 0; i < NOTIFS_SIZE; i++) {
          for (let j = 0; j < TASKS_SIZE; j++) {
            if (notifs[i].task_id === tasks[j]._id) {
              state.notifications[i].title = tasks[j].title;
            }
          }
        }
      }
    });
  },
});

export const getNotifications = (state) => state.notifications.notifications;

export default notificationsSlice.reducer;
