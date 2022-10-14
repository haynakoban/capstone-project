import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';

const initialState = {
  notifications: [],
  notification: {},
  read_notifs: 0,
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

// read notification
export const readNotification = createAsyncThunk(
  'files/readNotification',
  async (initialState) => {
    try {
      const { id, user_id } = initialState;
      const response = await axios.put(`api/notifications/${id}`, { user_id });

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    newNotification: (state, action) => {
      if (action.payload.task && action.payload.notif) {
        const { notif, user, task } = action.payload;
        notif.title = task.title;
        notif.name = user?.[0]?.name;

        state.notifications?.unshift(notif);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(selectAllNotification.fulfilled, (state, action) => {
        if (action.payload.notifs && action.payload.users) {
          const { notifs, users, tasks, notif_ids } = action.payload;

          state.notifications = notifs;
          state.read_notifs = notif_ids?.length;

          const NOTIFS_SIZE = notifs?.length;
          const NOTIFS_IDS_SIZE = notif_ids?.length;
          const USERS_SIZE = users?.length;
          const TASKS_SIZE = tasks?.length;

          // assign recipient
          for (let i = 0; i < NOTIFS_SIZE; i++) {
            for (let j = 0; j < NOTIFS_IDS_SIZE; j++) {
              if (notifs[i]._id === notif_ids[j]._id) {
                state.notifications[i].recipient = {
                  recipient_id: notif_ids?.[j]?.recipient_id,
                  is_read: notif_ids?.[j]?.is_read,
                };
              }
            }
          }

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
      })
      .addCase(readNotification.fulfilled, (state, action) => {
        if (action.payload.notif) {
          const { notif } = action.payload;

          state.notifications.map((e) => {
            if (e?._id === notif?._id) {
              delete e.recipient;

              return e;
            }
            return e;
          });
        }
      });
  },
});

export const getNotifications = (state) => state.notifications.notifications;
export const getReadNotifs = (state) => state.notifications.read_notifs;

export const { newNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
