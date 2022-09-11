import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';

const initialState = {
  users: [],
  user_id: '',
  user: { isIntern: true },
  isAuthorized: true,
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

export const userLogout = createAsyncThunk('users/userLogout', async () => {
  try {
    const response = await axios.get('/api/users/validation');

    return response.data;
  } catch (e) {
    return e.message;
  }
});

export const fetchUserInfo = createAsyncThunk(
  'users/fetchUserInfo',
  async (id) => {
    try {
      const response = await axios.get(`/api/users/auth/${id}`);

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
          state.user_id = action.payload.user_id;
        }

        state.isAuthorized = action.payload.userLoggedIn;
      })
      .addCase(isUserLoggedIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        if (!action.payload?.userLoggedIn) {
          state.user_id = '';
          state.user = { isIntern: true };
          state.isAuthorized = true;
        }
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
        }
      });
  },
});

export const isUserAuthorized = (state) => state.users.isAuthorized;
export const getUserId = (state) => state.users.user_id;
export const getUserInfo = (state) => state.users.user;
export const getUserStatus = (state) => state.users.status;

// remove the comment once a code in reducers added.
// export const { loggedIn } = usersSlice.actions;

export default usersSlice.reducer;
