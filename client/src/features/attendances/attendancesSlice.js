import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';

const initialState = {
  attendances: [],
  attendance: {},
  daily_attendances: [],
  daily_attendance: {},
  monthly_attendances: [],
  summary_attendances: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// create daily attendance
export const createNewDailyAttendance = createAsyncThunk(
  'attendances/createNewDailyAttendance',
  async (initialState) => {
    try {
      const response = await axios.post(`api/attendances`, initialState);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// update daily attendance
export const updateDailyAttendance = createAsyncThunk(
  'attendances/updateDailyAttendance',
  async (initialState) => {
    try {
      const response = await axios.put(`api/attendances`, initialState);

      return response.data;
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }
);

// fetch daily attendance
export const fetchDailyAttendance = createAsyncThunk(
  'attendances/fetchDailyAttendance',
  async (initialState) => {
    try {
      const { id, attendance_date } = initialState;

      const response = await axios.get(
        `api/attendances/${id}/${attendance_date}`
      );

      return response.data;
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }
);

// fetch summary attendance
export const fetchSummaryAttendance = createAsyncThunk(
  'attendances/fetchSummaryAttendance',
  async (initialState) => {
    try {
      const { id } = initialState;

      const response = await axios.get(`api/attendances/${id}`);

      return response.data;
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }
);

// update logged out attendance
export const outTimeDailyAttendance = createAsyncThunk(
  'attendances/outTimeDailyAttendance',
  async (initialState) => {
    try {
      const { id } = initialState;

      const response = await axios.put(`api/attendances/${id}`, initialState);

      return response.data;
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }
);

// fetch monthly attendance
export const fetchMonthlyAttendance = createAsyncThunk(
  'attendances/fetchMonthlyAttendance',
  async (initialState) => {
    try {
      const { company_id, attendance_date } = initialState;

      const response = await axios.get(
        `api/attendances/monthly/${company_id}/${attendance_date}`
      );

      return response.data;
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }
);

const attendancesSlice = createSlice({
  name: 'attendances',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createNewDailyAttendance.fulfilled, (state, action) => {
        if (action.payload?.createAttendance) {
          state.daily_attendance = action.payload?.createAttendance;
        }

        if (action.payload.attendance) {
          state.daily_attendance = action.payload.attendance;
        }
      })
      .addCase(fetchDailyAttendance.fulfilled, (state, action) => {
        if (action.payload.users && action.payload.attendances) {
          const { attendances, users } = action.payload;

          state.daily_attendances = attendances;

          const ATTENDANCES_SIZE = attendances?.length;
          const USERS_SIZE = users?.length;

          // assign name with attendance
          for (let i = 0; i < ATTENDANCES_SIZE; i++) {
            for (let j = 0; j < USERS_SIZE; j++) {
              if (attendances[i].user_id === users[j]._id) {
                state.daily_attendances[i].name = users[j].name;
              }
            }
          }
        }
      })
      .addCase(updateDailyAttendance.fulfilled, (state, action) => {
        if (action.payload.attendance) {
          const { _id } = action.payload.attendance;

          action.payload.attendance.name = action.payload.name;

          const attendances = state.daily_attendances.filter(
            (a) => a?._id !== _id
          );

          state.daily_attendances = [...attendances, action.payload.attendance];
        }
      })
      .addCase(fetchSummaryAttendance.fulfilled, (state, action) => {
        if (action.payload.users && action.payload.attendances) {
          const { attendances, users } = action.payload;

          const ATTENDANCES_SIZE = attendances?.length;
          const USERS_SIZE = users?.length;

          state.summary_attendances = users;

          // assign hours
          for (let i = 0; i < USERS_SIZE; i++) {
            let total = 0;

            for (let j = 0; j < ATTENDANCES_SIZE; j++) {
              if (users[i]._id === attendances[j].user_id) {
                // completed hours
                if (
                  attendances?.[j]?.total_hours &&
                  typeof attendances?.[j]?.total_hours === 'number'
                ) {
                  total += attendances?.[j]?.total_hours;
                }
              }
            }

            // completed hours
            state.summary_attendances[i].completed_hours = `${total?.toFixed(
              0
            )} Hours`;

            // remaining hours
            state.summary_attendances[i].remaining_hours = `${(
              486 - total
            )?.toFixed(0)} Hours`;

            // summary hours
            state.summary_attendances[i].summary_hours = `${total?.toFixed(
              0
            )}/486 Hours`;
          }
        }
      })
      .addCase(outTimeDailyAttendance.fulfilled, (state, action) => {
        if (action.payload?.attendance) {
          state.daily_attendance = action.payload?.attendance;
        }
      })
      .addCase(fetchMonthlyAttendance.fulfilled, (state, action) => {
        if (action.payload?.attendances && action.payload?.users) {
          const { attendances, users, month } = action.payload;

          const ATTENDANCES_SIZE = attendances?.length;
          const USERS_SIZE = users?.length;

          state.monthly_attendances = users;

          // assign hours
          for (let i = 0; i < USERS_SIZE; i++) {
            state.monthly_attendances[i].month = month;

            let summary = 0;
            let total = 0;
            let monthly = [];

            for (let j = 0; j < ATTENDANCES_SIZE; j++) {
              if (users[i]._id === attendances[j].user_id) {
                total += 1;

                if (attendances[j]?.status === 'Present') {
                  summary += 1;
                }

                // push the day and status
                monthly?.unshift({
                  day: attendances[j]?.attendance_date,
                  status: attendances[j]?.status,
                });
              }
            }

            // summary
            state.monthly_attendances[i].summary = `${summary}/${total} days`;

            // sort monthly
            const newMonth = monthly.sort((a, b) =>
              a?.day > b?.day ? 1 : b?.day > a?.day ? -1 : 0
            );

            // monthly
            state.monthly_attendances[i].monthly = newMonth;
          }
        }
      });
  },
});

export const dailyAttendance = (state) => state.attendances.daily_attendance;
export const getDailyAttendances = (state) =>
  state.attendances.daily_attendances;
export const getMonthlyAttendances = (state) =>
  state.attendances.monthly_attendances;
export const getSummaryAttendances = (state) =>
  state.attendances.summary_attendances;

export default attendancesSlice.reducer;
