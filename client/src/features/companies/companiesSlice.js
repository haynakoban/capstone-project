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
      const {
        roomName,
        companyName,
        description,
        showRoom,
        createdBy,
        members,
      } = initialState;

      const response = await axios.post('api/companies', {
        roomName,
        companyName,
        description,
        showRoom,
        createdBy,
        members,
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

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
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
      });
  },
});

export const getRooms = (state) => state.companies.companies;
export const myRooms = (state) => state.companies.rooms;
export const getError = (state) => state.companies.error;

// export const roomStatus = (state) => state.companies.status;

export default companiesSlice.reducer;
