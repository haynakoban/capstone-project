import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';

const initialState = {
  files: [],
  file: {},
  isFileDelete: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// delete the file
export const deleteFile = createAsyncThunk(
  'files/deleteFile',
  async (initialState) => {
    try {
      const response = await axios.delete(`api/users/files/${initialState}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(deleteFile.fulfilled, (state, action) => {
      if (action.payload?.msg) {
        state.isFileDelete = true;
      }
    });
  },
});

export const isFileDeleted = (state) => state.files.isFileDelete;

export default filesSlice.reducer;
