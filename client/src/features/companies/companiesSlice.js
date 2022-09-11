import { createSlice } from '@reduxjs/toolkit';
// import axios from '../../lib/axiosConfig';

const initialState = {
  companies: [],
  company_id: '',
  company: { isIntern: true },
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
});

export default companiesSlice.reducer;
