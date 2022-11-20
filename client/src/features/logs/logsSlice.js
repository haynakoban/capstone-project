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

// for admin: get all daily csv
export const getAllDailyLogsCSV = (state) => {
  const items = state.logs.logs;
  const day = state.logs.logs?.[0]?.report_date;

  const new_items = items?.map((item) => {
    const newObj = {
      name: item?.name,
      report_date: item?.report_date,
      time: item?.time,
      user_type: item?.user_type,
      log: item?.log,
      ip_address: item?.ip_address,
    };

    return newObj;
  });

  // specify how you want to handle null values here
  const replacer = (key, value) => (value === null ? '' : value);

  const header = [
    'Name',
    'Report Date',
    'Time',
    'User Type',
    'Log',
    'IP Address',
  ];
  const fields = [
    'name',
    'report_date',
    'time',
    'user_type',
    'log',
    'ip_address',
  ];

  const csv = [
    header.join(','), // header row first
    ...new_items.map((row) =>
      fields
        .map((fieldName) => JSON.stringify(row?.[fieldName], replacer))
        .join(',')
    ),
  ].join('\r\n');

  return { csv, day };
};
