import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';
import { TimeFormatter } from '../../lib/DateFormatter';

const initialState = {
  attendances: [],
  attendance: {},
  daily_attendances: [],
  daily_attendance: {},
  monthly_attendances: [],
  summary_attendances: [],
  my_daily_attendances: [],
  my_monthly_attendances: [],
  my_summary_attendances: {},
  a_admin_daily: [],
  a_admin_monthly: [],
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

// generate attendance
export const generateAttendances = createAsyncThunk(
  'attendances/generateAttendances',
  async (initialState) => {
    try {
      const response = await axios.post('api/attendances/gen', initialState);

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
      return e.message;
    }
  }
);

// fetch my sumary attendance
export const fetchMySummaryAttendance = createAsyncThunk(
  'attendances/fetchMySummaryAttendance',
  async (initialState) => {
    try {
      const { company_id, user_id } = initialState;

      const response = await axios.get(
        `api/attendances/summary/${company_id}/${user_id}`
      );

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// fetch my daily attendance
export const fetchMyDailyAttendance = createAsyncThunk(
  'attendances/fetchMyDailyAttendance',
  async (initialState) => {
    try {
      const { company_id, attendance_date, user_id } = initialState;

      const response = await axios.get(
        `api/attendances/daily/${company_id}/${attendance_date}/${user_id}`
      );

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// fetch my monthly attendance
export const fetchMyMonthlyAttendance = createAsyncThunk(
  'attendances/fetchMyMonthlyAttendance',
  async (initialState) => {
    try {
      const { company_id, attendance_date, user_id } = initialState;

      const response = await axios.get(
        `api/attendances/monthly/${company_id}/${attendance_date}/${user_id}`
      );

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// fetch all daily attendance
export const fetchAllDailyAttendance = createAsyncThunk(
  'attendances/fetchAllDailyAttendance',
  async (initialState) => {
    try {
      const { attendance_date } = initialState;

      const response = await axios.get(
        `api/attendances/admin/d/${attendance_date}`
      );

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// fetch all monthly attendance
export const fetchAllMonthlyAttendance = createAsyncThunk(
  'attendances/fetchAllMonthlyAttendance',
  async (initialState) => {
    try {
      const { attendance_date } = initialState;

      const response = await axios.get(
        `api/attendances/admin/m/${attendance_date}`
      );

      return response.data;
    } catch (e) {
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
                // check if present and if there is total hours
                if (
                  attendances?.[j]?.status === 'Present' &&
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
        if (action.payload?.err) {
          state.monthly_attendances = [];
        }

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
      })
      .addCase(fetchMySummaryAttendance.fulfilled, (state, action) => {
        if (action.payload.msg) {
          state.my_summary_attendances = {};
        }

        if (action.payload.attendances) {
          const { attendances, user } = action.payload;

          const ATTENDANCES_SIZE = attendances?.length;

          // assign name
          state.my_summary_attendances = user;

          let total = 0;

          // assign hours
          for (let i = 0; i < ATTENDANCES_SIZE; i++) {
            // check if present and if there is total hours
            if (
              attendances?.[i]?.status === 'Present' &&
              attendances?.[i]?.total_hours &&
              typeof attendances?.[i]?.total_hours === 'number'
            ) {
              total += attendances?.[i]?.total_hours;
            }
          }

          // completed hours (INT)
          state.my_summary_attendances.int_completed_hours = total?.toFixed(0);

          // remaining hours (INT)
          state.my_summary_attendances.int_remaining_hours = (
            486 - total
          )?.toFixed(0);

          // completed hours
          state.my_summary_attendances.completed_hours = `${total?.toFixed(
            0
          )} Hours`;

          // remaining hours
          state.my_summary_attendances.remaining_hours = `${(
            486 - total
          )?.toFixed(0)} Hours`;

          // summary hours
          state.my_summary_attendances.summary_hours = `${total?.toFixed(
            0
          )}/486 Hours`;
        }
      })
      .addCase(fetchMyDailyAttendance.fulfilled, (state, action) => {
        if (action.payload.user && action.payload.attendances) {
          const { attendances, user } = action.payload;

          state.my_daily_attendances = attendances;
          state.my_daily_attendances[0].name = user?.name;
        }
      })
      .addCase(fetchMyMonthlyAttendance.fulfilled, (state, action) => {
        if (action.payload?.err) {
          state.my_monthly_attendances = [];
        }

        if (action.payload?.attendances && action.payload?.user) {
          const { attendances, user, month } = action.payload;

          const ATTENDANCES_SIZE = attendances?.length;

          state.my_monthly_attendances = [user];

          // assign hours
          state.my_monthly_attendances[0].month = month;

          let summary = 0;
          let total = 0;
          let monthly = [];

          for (let j = 0; j < ATTENDANCES_SIZE; j++) {
            if (user?._id === attendances[j]?.user_id) {
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
          state.my_monthly_attendances[0].summary = `${summary}/${total} days`;

          // sort monthly
          const newMonth = monthly.sort((a, b) =>
            a?.day > b?.day ? 1 : b?.day > a?.day ? -1 : 0
          );

          // monthly
          state.my_monthly_attendances[0].monthly = newMonth;
        }
      })
      .addCase(generateAttendances.fulfilled, (state, action) => {
        if (action.payload?.attendances) {
          const { attendances, users } = action.payload;

          const genAttendances = attendances;

          const ATTENDANCES_SIZE = attendances?.length;
          const USERS_SIZE = users?.length;

          // assign name with attendance
          for (let i = 0; i < ATTENDANCES_SIZE; i++) {
            for (let j = 0; j < USERS_SIZE; j++) {
              if (attendances[i].user_id === users[j]._id) {
                genAttendances[i].name = users[j].name;
              }
            }
          }

          const listOfAttendances =
            state.daily_attendances?.concat(genAttendances);

          state.daily_attendances = listOfAttendances;
        } else if (action.payload?.attendance) {
          const { attendance, user } = action.payload;

          attendance.name = user?.name;

          state.daily_attendances = [...state.daily_attendances, attendance];
        }
      })
      .addCase(fetchAllDailyAttendance.fulfilled, (state, action) => {
        if (action.payload?.err) {
          state.a_admin_daily = [];
          return;
        }

        if (action.payload?.attendances && action.payload?.users) {
          state.a_admin_daily = [];
          const { attendances, users } = action.payload;

          // assign name with attendance
          for (const attendance of attendances) {
            for (const user of users) {
              if (attendance?.user_id === user?._id) {
                attendance.name = user?.name;
                state.a_admin_daily?.push(attendance);
              }
            }
          }
        }
      })
      .addCase(fetchAllMonthlyAttendance.fulfilled, (state, action) => {
        if (action.payload?.err) {
          state.a_admin_monthly = [];
          return;
        }

        if (action.payload?.attendances && action.payload?.users) {
          state.a_admin_monthly = [];
          const { attendances, users, month } = action.payload;

          // assign hours
          for (const user of users) {
            user.month = month;

            let summary = 0;
            let total = 0;
            let monthly = [];

            for (const attendance of attendances) {
              if (user?._id === attendance?.user_id) {
                total += 1;

                if (attendance?.status === 'Present') {
                  summary += 1;
                }

                // push the day and status
                monthly?.unshift({
                  day: attendance?.attendance_date,
                  status: attendance?.status,
                });
              }
            }

            // summary
            user.summary = `${summary}/${total} days`;

            // sort monthly
            const newMonth = monthly.sort((a, b) =>
              a?.day > b?.day ? 1 : b?.day > a?.day ? -1 : 0
            );

            // monthly
            user.monthly = newMonth;

            state.a_admin_monthly?.push(user);
          }
        }
      });
  },
});

// admin
export const getAllDaily = (state) => state.attendances.a_admin_daily;
export const getAllMonthly = (state) => state.attendances.a_admin_monthly;

export const dailyAttendance = (state) => state.attendances.daily_attendance;
export const getDailyAttendances = (state) =>
  state.attendances.daily_attendances;
export const getMonthlyAttendances = (state) =>
  state.attendances.monthly_attendances;
export const getSummaryAttendances = (state) =>
  state.attendances.summary_attendances;
export const getMySummaryAttendances = (state) =>
  state.attendances.my_summary_attendances;
export const getMyDailyAttendances = (state) =>
  state.attendances.my_daily_attendances;
export const getMyMonthlyAttendances = (state) =>
  state.attendances.my_monthly_attendances;

// for admin: get all daily csv
export const getAllDailyCSV = (state) => {
  const items = state.attendances.a_admin_daily;
  const day = state.attendances.a_admin_daily?.[0]?.attendance_date;

  const new_items = items?.map((item) => {
    const newObj = {
      name: item?.name,
      attendance_date: item?.attendance_date,
      in_time: item?.in_time ? TimeFormatter(item?.in_time) : '00:00',
      out_time: item?.out_time ? TimeFormatter(item?.out_time) : '00:00',
      status: item?.status,
    };

    return newObj;
  });

  // specify how you want to handle null values here
  const replacer = (key, value) => (value === null ? '' : value);

  const header = ['Name', 'Attendance Date', 'In Time', 'Out Time', 'Status'];
  const fields = ['name', 'attendance_date', 'in_time', 'out_time', 'status'];

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

// for admin: get all monthly csv
export const getAllMonthlyCSV = (state) => {
  const items = state.attendances.a_admin_monthly;
  const month = state.attendances.a_admin_monthly?.[0]?.month;
  const monthlyHeader = [];

  const new_items = items?.map((item) => {
    const newObj = {
      month: item?.month,
      name: item?.name,
      monthly: item?.monthly,
      summary: item?.summary,
    };

    item?.monthly.forEach((day) => {
      // return true if day is in the monthlyheader, otherwise false
      const res = monthlyHeader?.some((e) => e === day?.day);

      // if res variable is false, add the day in the monthly header
      if (!res) monthlyHeader?.push(day?.day);
    });

    return newObj;
  });

  // specify how you want to handle null values here
  const replacer = (key, value) => (value === null ? '' : value);

  const header = ['Name', 'Summary', 'Month']?.concat(monthlyHeader);
  const fields = ['name', 'summary', 'month'];

  const csv = [
    header.join(','), // header row first
    ...new_items.map((row) => {
      // get user info: name, summary and month field
      const getUserRow = fields.map((fieldName) =>
        JSON.stringify(row?.[fieldName], replacer)
      );

      // get the rest of the day in month
      const getDaysRow = monthlyHeader?.map((day) => {
        const getDay = row?.monthly?.filter((d) => d?.day === day);

        if (getDay?.length > 0) {
          return JSON.stringify(getDay?.[0]?.status, replacer);
        } else {
          return null;
        }
      });

      const getRow = getUserRow?.concat(getDaysRow)?.join(',');

      return getRow;
    }),
  ].join('\r\n');

  return { csv, month };
};

// get daily csv
export const getDailyCSV = (state) => {
  const items = state.attendances.daily_attendances;
  const day = state.attendances.daily_attendances?.[0]?.attendance_date;

  const new_items = items?.map((item) => {
    const newObj = {
      name: item?.name,
      attendance_date: item?.attendance_date,
      in_time: item?.in_time ? TimeFormatter(item?.in_time) : '00:00',
      out_time: item?.out_time ? TimeFormatter(item?.out_time) : '00:00',
      status: item?.status,
    };

    return newObj;
  });

  // specify how you want to handle null values here
  const replacer = (key, value) => (value === null ? '' : value);

  const header = ['Name', 'Attendance Date', 'In Time', 'Out Time', 'Status'];
  const fields = ['name', 'attendance_date', 'in_time', 'out_time', 'status'];

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

// get monthly csv
export const getMonthlyCSV = (state) => {
  const items = state.attendances.monthly_attendances;
  const month = state.attendances.monthly_attendances?.[0]?.month;
  const monthlyHeader = [];

  const new_items = items?.map((item) => {
    const newObj = {
      month: item?.month,
      name: item?.name,
      monthly: item?.monthly,
      summary: item?.summary,
    };

    item?.monthly.forEach((day) => {
      // return true if day is in the monthlyheader, otherwise false
      const res = monthlyHeader?.some((e) => e === day?.day);

      // if res variable is false, add the day in the monthly header
      if (!res) monthlyHeader?.push(day?.day);
    });

    return newObj;
  });

  // specify how you want to handle null values here
  const replacer = (key, value) => (value === null ? '' : value);

  const header = ['Name', 'Summary', 'Month']?.concat(monthlyHeader);
  const fields = ['name', 'summary', 'month'];

  const csv = [
    header.join(','), // header row first
    ...new_items.map((row) => {
      // get user info: name, summary and month field
      const getUserRow = fields.map((fieldName) =>
        JSON.stringify(row?.[fieldName], replacer)
      );

      // get the rest of the day in month
      const getDaysRow = monthlyHeader?.map((day) => {
        const getDay = row?.monthly?.filter((d) => d?.day === day);

        if (getDay?.length > 0) {
          return JSON.stringify(getDay?.[0]?.status, replacer);
        } else {
          return null;
        }
      });

      const getRow = getUserRow?.concat(getDaysRow)?.join(',');

      return getRow;
    }),
  ].join('\r\n');

  return { csv, month };
};

// get summary csv
export const getSummaryCSV = (state) => {
  const items = state.attendances.summary_attendances;

  const new_items = items?.map((item) => {
    const newObj = {
      name: item?.name,
      completed_hours: item?.completed_hours,
      remaining_hours: item?.remaining_hours,
      summary_hours: item?.summary_hours,
    };

    return newObj;
  });

  // specify how you want to handle null values here
  const replacer = (key, value) => (value === null ? '' : value);

  const header = ['Name', 'Summary', 'Completed Hours', 'Remaining Hours'];
  const fields = [
    'name',
    'summary_hours',
    'completed_hours',
    'remaining_hours',
  ];

  const csv = [
    header.join(','), // header row first
    ...new_items.map((row) =>
      fields
        .map((fieldName) => JSON.stringify(row?.[fieldName], replacer))
        .join(',')
    ),
  ].join('\r\n');

  return csv;
};

// get my daily csv
export const getMyDailyCSV = (state) => {
  const items = state.attendances.my_daily_attendances;
  const day = state.attendances.my_daily_attendances?.[0]?.attendance_date;

  const new_items = items?.map((item) => {
    const newObj = {
      name: item?.name,
      attendance_date: item?.attendance_date,
      in_time: item?.in_time ? TimeFormatter(item?.in_time) : '00:00',
      out_time: item?.out_time ? TimeFormatter(item?.out_time) : '00:00',
      status: item?.status,
    };

    return newObj;
  });

  // specify how you want to handle null values here
  const replacer = (key, value) => (value === null ? '' : value);

  const header = ['Name', 'Attendance Date', 'In Time', 'Out Time', 'Status'];
  const fields = ['name', 'attendance_date', 'in_time', 'out_time', 'status'];

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

// get my monthly csv
export const getMyMonthlyCSV = (state) => {
  const items = state.attendances.my_monthly_attendances;
  const month = state.attendances.my_monthly_attendances?.[0]?.month;
  const monthlyHeader = [];

  const new_items = items?.map((item) => {
    const newObj = {
      month: item?.month,
      name: item?.name,
      monthly: item?.monthly,
      summary: item?.summary,
    };

    item?.monthly.forEach((day) => {
      // return true if day is in the monthlyheader, otherwise false
      const res = monthlyHeader?.some((e) => e === day?.day);

      // if res variable is false, add the day in the monthly header
      if (!res) monthlyHeader?.push(day?.day);
    });

    return newObj;
  });

  // specify how you want to handle null values here
  const replacer = (key, value) => (value === null ? '' : value);

  const header = ['Name', 'Summary', 'Month']?.concat(monthlyHeader);
  const fields = ['name', 'summary', 'month'];

  const csv = [
    header.join(','), // header row first
    ...new_items.map((row) => {
      // get user info: name, summary and month field
      const getUserRow = fields.map((fieldName) =>
        JSON.stringify(row?.[fieldName], replacer)
      );

      // get the rest of the day in month
      const getDaysRow = monthlyHeader?.map((day) => {
        const getDay = row?.monthly?.filter((d) => d?.day === day);

        if (getDay?.length > 0) {
          return JSON.stringify(getDay?.[0]?.status, replacer);
        } else {
          return null;
        }
      });

      const getRow = getUserRow?.concat(getDaysRow)?.join(',');

      return getRow;
    }),
  ].join('\r\n');

  return { csv, month };
};

// get my summary csv
export const getMySummaryCSV = (state) => {
  const items = state.attendances.my_summary_attendances;

  const newObj = {
    name: items?.name,
    completed_hours: items?.completed_hours,
    remaining_hours: items?.remaining_hours,
    summary_hours: items?.summary_hours,
  };

  const new_items = [newObj];

  // specify how you want to handle null values here
  const replacer = (key, value) => (value === null ? '' : value);

  const header = ['Name', 'Summary', 'Completed Hours', 'Remaining Hours'];
  const fields = [
    'name',
    'summary_hours',
    'completed_hours',
    'remaining_hours',
  ];

  const csv = [
    header.join(','), // header row first
    ...new_items.map((row) =>
      fields
        .map((fieldName) => JSON.stringify(row?.[fieldName], replacer))
        .join(',')
    ),
  ].join('\r\n');

  return csv;
};

// get my daily pdf
export const getMyDailyPDF = (state) => {
  const items = state.attendances.my_daily_attendances?.[0];
  const day = state.attendances.my_daily_attendances?.[0]?.attendance_date;

  const in_time = items?.in_time ? TimeFormatter(items?.in_time) : '00:00';
  const out_time = items?.out_time ? TimeFormatter(items?.out_time) : '00:00';

  const pdf = `
    Name: ${items?.name}
    Attendance Date: ${items?.attendance_date}
    In Time: ${in_time}
    Out Time: ${out_time}
    Status: ${items?.status}`;

  return { pdf, day };
};

// get my daily pdf
export const getMyMonthlyPDF = (state) => {
  const items = state.attendances.my_monthly_attendances;
  const month = state.attendances.my_monthly_attendances?.[0]?.month;
  const monthlyHeader = [];

  items?.[0]?.monthly.forEach((day) => {
    // return true if day is in the monthlyheader, otherwise false
    const res = monthlyHeader?.some((e) => e === day?.day);

    // if res variable is false, add the day in the monthly header
    if (!res) monthlyHeader?.push({ day: day?.day, status: day?.status });
  });

  const days = [
    ...monthlyHeader?.map((e) => {
      return `\r${e?.day}: ${e?.status}`;
    }),
  ].join('\n');

  const pdf = `
  Name: ${items?.[0]?.name}
  Summary: ${items?.[0]?.summary}
  Month: ${month}
  ${days}
  `;

  return { pdf, month };
};

// get my summary pdf
export const getMySummaryPDF = (state) => {
  const items = state.attendances.my_summary_attendances;

  const pdf = `
    Name: ${items?.name}
    Summary: ${items?.summary_hours}
    Completed Hours: ${items?.completed_hours}
    Remaining Hours: ${items?.remaining_hours}`;

  return pdf;
};

export default attendancesSlice.reducer;
