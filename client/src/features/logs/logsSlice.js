import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';

const initialState = {
  logs: [],
  log: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// create log report
export const createLog = createAsyncThunk(
  'logs/createLog',
  async (initialState) => {
    try {
      const response = await axios.post(`api/logs`, initialState);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// get log reports
export const getLogReports = createAsyncThunk(
  'logs/getLogReports',
  async (initialState) => {
    try {
      const { date } = initialState;

      const response = await axios.get(`api/logs/${date}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createLog.fulfilled, (state, action) => {
        if (action.payload?.err) {
          state.logs = [];
          return;
        }

        if (action.payload?.msg && action.payload?.log) {
          const { log } = action.payload;

          state.logs?.unshift(log);
        }
      })
      .addCase(getLogReports.fulfilled, (state, action) => {
        if (action.payload?.err) {
          state.logs = [];
          return;
        }

        if (action.payload?.users && action.payload?.logs) {
          state.logs = [];
          const { users, logs } = action.payload;

          for (const log of logs) {
            for (const user of users) {
              if (log?.user_id === user?._id) {
                log.name = user?.name;
                state.logs?.push(log);
              }
            }
          }
        }
      });
  },
});

export const getLogs = (state) => state.logs.logs;

export default logsSlice.reducer;
