import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';

const initialState = {
  companies: [],
  company_id: '',
  company: {},
  rooms: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// fetchRoom in internship page
export const fetchRooms = createAsyncThunk('companies/fetchRooms', async () => {
  try {
    const response = await axios.get('api/companies');

    return response.data;
  } catch (e) {
    return e.message;
  }
});

// create a new room
export const createNewRoom = createAsyncThunk(
  'companies/createNewRoom',
  async (initialState) => {
    try {
      const { roomName, companyName, description, showRoom, members } =
        initialState;

      const response = await axios.post('api/companies', {
        roomName,
        companyName,
        description,
        showRoom,
        id: members,
      });

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// join room (only for employee)
export const joinRoom = createAsyncThunk(
  'companies/joinRoom',
  async (initialState) => {
    try {
      const { companyName, roomCode, id } = initialState;

      const response = await axios.post('api/companies/validate', {
        companyName,
        roomCode,
        id,
      });

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// retrieve the list of rooms by using id
export const getMyRoom = createAsyncThunk(
  'companies/getMyRoom',
  async (initialState) => {
    try {
      const { id } = initialState;

      const response = await axios.get(`api/companies/${id}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// get the current room
export const getRoomInfo = createAsyncThunk(
  'companies/getRoomInfo',
  async (initialState) => {
    try {
      const response = await axios.get(`api/companies/auth/${initialState}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// accept intern request
export const acceptIntern = createAsyncThunk(
  'companies/acceptIntern',
  async (initialState) => {
    try {
      const { id, user_id } = initialState;

      const response = await axios.put(`api/companies/${id}/${user_id}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// decline intern request
export const declineInternRequest = createAsyncThunk(
  'companies/declineInternRequest',
  async (initialState) => {
    try {
      const { id, user_id } = initialState;

      const response = await axios.delete(`api/companies/${id}/${user_id}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// start and end time : on and off
export const toggleStartAndEndTime = createAsyncThunk(
  'companies/toggleStartAndEndTime',
  async (initialState) => {
    try {
      const { id } = initialState;

      const response = await axios.put(
        `api/companies/auth/${id}`,
        initialState
      );

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    EnteredRoomId: (state, action) => {
      state.company_id = action.payload;
    },
    addDescription: (state, action) => {
      if (action.payload?.description === '') {
        state.company = {
          ...state.company,
          description: '',
        };
      } else {
        state.company = {
          ...state.company,
          description: action.payload?.description,
        };
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRooms.fulfilled, (state, action) => {
        if (action.payload?.company) {
          state.companies = action.payload.company;
        }
      })
      .addCase(createNewRoom.fulfilled, (state, action) => {
        if (action.payload?.company) {
          state.rooms.push(action.payload?.company);
        }
      })
      .addCase(getMyRoom.fulfilled, (state, action) => {
        if (action.payload.rooms) {
          state.rooms = action.payload.rooms;
        }
      })
      .addCase(joinRoom.fulfilled, (state, action) => {
        if (action.payload.err) {
          state.error = action.payload.err;
        }

        if (action.payload.rooms) {
          state.rooms.push(action.payload?.rooms);
        }
      })
      .addCase(getRoomInfo.fulfilled, (state, action) => {
        if (action.payload.err) {
          state.error = action.payload.err;
        }

        if (action.payload.room && action.payload.users) {
          state.company = action.payload.room;

          const MEMBERS_SIZE = action.payload.room.members.length;
          const REQUEST_SIZE = action.payload?.room?.request?.length;
          const PENDING_SIZE = action.payload?.room?.pending?.length;
          const USERS_SIZE = action.payload.users.length;

          const REQ_USERS_SIZE = action.payload.req_users.length;
          const PEN_USERS_SIZE = action.payload.pen_users.length;
          const REQ_FILE_SIZE = action.payload.files.length;

          const members = action.payload.room.members;
          const users = action.payload.users;

          const req_members = action.payload.room.request;
          const pen_members = action.payload.room.pending;
          const req_users = action.payload.req_users;
          const pen_users = action.payload.pen_users;
          const req_files = action.payload.files;

          for (let i = 0; i < MEMBERS_SIZE; i++) {
            for (let j = 0; j < USERS_SIZE; j++) {
              if (members[i].id === users[j]._id) {
                state.company.members[i].name = users[j].name;
              }
            }
          }

          // adding the name
          for (let i = 0; i < REQUEST_SIZE; i++) {
            for (let j = 0; j < REQ_USERS_SIZE; j++) {
              if (req_members[i].user_id === req_users[j]._id) {
                state.company.request[i].name = req_users[j].name;
              }
            }
          }
          // adding the filename
          for (let i = 0; i < REQUEST_SIZE; i++) {
            for (let j = 0; j < REQ_FILE_SIZE; j++) {
              if (req_members[i].file_id === req_files[j]._id) {
                state.company.request[i].filename = req_files[j].filename;
              }
            }
          }

          // pending: adding the name
          for (let i = 0; i < PENDING_SIZE; i++) {
            for (let j = 0; j < PEN_USERS_SIZE; j++) {
              if (pen_members[i].user_id === pen_users[j]._id) {
                state.company.pending[i].name = pen_users[j].name;
              }
            }
          }
        }
      })
      .addCase(acceptIntern.fulfilled, (state, action) => {
        const { room, users, pen_users } = action.payload;
        if (action.payload.err) {
          state.error = action.payload.err;
        }

        if (room && users && pen_users && action.payload.files) {
          state.company = action.payload.room;

          const MEMBERS_SIZE = action.payload.room.members.length;
          const REQUEST_SIZE = action.payload?.room?.request?.length;
          const PENDING_SIZE = action.payload?.room?.pending?.length;
          const USERS_SIZE = users.length;
          const REQ_USERS_SIZE = action.payload.req_users.length;
          const PEN_USERS_SIZE = pen_users.length;
          const FILE_SIZE = action.payload.files.length;

          const members = action.payload?.room.members;
          const request = action.payload?.room?.request;
          const pending = action.payload?.room?.pending;
          const req_users = action.payload.req_users;
          const files = action.payload.files;

          for (let i = 0; i < MEMBERS_SIZE; i++) {
            for (let j = 0; j < USERS_SIZE; j++) {
              if (members[i].id === users[j]._id) {
                state.company.members[i].name = users[j].name;
              }
            }
          }

          // request: adding the name
          for (let i = 0; i < REQUEST_SIZE; i++) {
            for (let j = 0; j < REQ_USERS_SIZE; j++) {
              if (request[i].user_id === req_users[j]._id) {
                state.company.request[i].name = req_users[j].name;
              }
            }
          }

          // request: adding the filename
          for (let i = 0; i < REQUEST_SIZE; i++) {
            for (let j = 0; j < FILE_SIZE; j++) {
              if (request[i].file_id === files[j]._id) {
                state.company.request[i].filename = files[j].filename;
              }
            }
          }

          // pending: adding the name
          for (let i = 0; i < PENDING_SIZE; i++) {
            for (let j = 0; j < PEN_USERS_SIZE; j++) {
              if (pending[i].user_id === pen_users[j]._id) {
                state.company.pending[i].name = pen_users[j].name;
              }
            }
          }
        } else if (room && users && pen_users) {
          state.company = action.payload.room;

          const MEMBERS_SIZE = action.payload.room.members.length;
          const USERS_SIZE = users.length;
          const PENDING_SIZE = action.payload?.room?.pending?.length;
          const PEN_USERS_SIZE = pen_users.length;

          const members = action.payload?.room.members;
          const pending = action.payload?.room?.pending;

          for (let i = 0; i < MEMBERS_SIZE; i++) {
            for (let j = 0; j < USERS_SIZE; j++) {
              if (members[i].id === users[j]._id) {
                state.company.members[i].name = users[j].name;
              }
            }
          }

          // pending: adding the name
          for (let i = 0; i < PENDING_SIZE; i++) {
            for (let j = 0; j < PEN_USERS_SIZE; j++) {
              if (pending[i].user_id === pen_users[j]._id) {
                state.company.pending[i].name = pen_users[j].name;
              }
            }
          }
        }
      })
      .addCase(declineInternRequest.fulfilled, (state, action) => {
        if (action.payload.company_id && action.payload.user_id) {
          const { user_id } = action.payload;

          const company = state.company?.request?.filter(
            (c) => c.user_id !== user_id
          );

          state.company = { ...state.company, request: company };
        }
      })
      .addCase(toggleStartAndEndTime.fulfilled, (state, action) => {
        if (action.payload?.err) {
          return;
        }
        return;
      });
  },
});

export const getRooms = (state) => state.companies.companies;
export const roomId = (state) => state.companies.company_id;
export const myRooms = (state) => state.companies.rooms;
export const getError = (state) => state.companies.error;
export const getCompanyInfo = (state) => state.companies.company;

// export const roomStatus = (state) => state.companies.status;

export const { addDescription, EnteredRoomId } = companiesSlice.actions;

export default companiesSlice.reducer;
