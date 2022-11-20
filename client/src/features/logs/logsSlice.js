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

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createLog.fulfilled, (state, action) => {
      if (action.payload?.err) {
        return;
      }

      if (action.payload?.msg && action.payload?.log) {
        const { log } = action.payload;

        state.logs?.unshift(log);
      }
    });
  },
});

export const getLogs = (state) => state.logs.logs;

export default logsSlice.reducer;
