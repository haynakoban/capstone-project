import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';

const initialState = {
  users: [],
  user: {},
  isAuthorized: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const isUserLoggedIn = createAsyncThunk(
  'users/isUserLoggedIn',
  async () => {
    try {
      const response = await axios.get('/api/users/auth');

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(isUserLoggedIn.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(isUserLoggedIn.fulfilled, (state, action) => {
        state.status = 'succeeded';

        if (action.payload.userLoggedIn) {
          state.user = action.payload.user;
        }

        state.isAuthorized = action.payload.userLoggedIn;
      })
      .addCase(isUserLoggedIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const isUserAuthorized = (state) => state.users.isAuthorized;
export const getUser = (state) => state.users.user;

// remove the comment once a code in reducers added.
// export const { userAdded } = usersSlice.actions;

export default usersSlice.reducer;
