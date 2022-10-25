import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';

const initialState = {
  attendances: [],
  attendance: {},
  daily_attendances: [],
  daily_attendance: {},
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
      });
  },
});

export const dailyAttendance = (state) => state.attendances.daily_attendance;
export const getDailyAttendances = (state) =>
  state.attendances.daily_attendances;

export default attendancesSlice.reducer;
