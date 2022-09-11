import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';

const initialState = {
  companies: [],
  company_id: '',
  company: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchRooms = createAsyncThunk('companies/fetchRooms', async () => {
  try {
    const response = await axios.get('api/companies');

    return response.data;
  } catch (e) {
    return e.message;
  }
});

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      if (action.payload?.company) {
        state.companies = action.payload.company;
      }
    });
  },
});

export const getRooms = (state) => state.companies.companies;

export default companiesSlice.reducer;
