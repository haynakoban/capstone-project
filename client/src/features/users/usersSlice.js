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

// validate if the user is logged in or not
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

// log the user out
export const userLogout = createAsyncThunk('users/userLogout', async () => {
  try {
    const response = await axios.get('/api/users/validation');

    return response.data;
  } catch (e) {
    return e.message;
  }
});

// fetch the current user information
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

// update the current user profile information
export const updateUserProfileInfo = createAsyncThunk(
  'users/updateUserProfileInfo',
  async (initialState) => {
    const { _id, name, address, gender, isIntern } = initialState;

    try {
      const response = await axios.put(`api/users/auth/${_id}`, {
        name,
        address,
        gender,
        isIntern,
      });

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// update the current user contact information
export const updateUserContactInfo = createAsyncThunk(
  'users/updateUserContactInfo',
  async (initialState) => {
    const { _id, phoneNumber, email, isIntern } = initialState;

    try {
      const response = await axios.put(`api/users/auth/${_id}`, {
        phoneNumber,
        email,
        isIntern,
      });

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// update the current user company information
export const updateUserCompanyInfo = createAsyncThunk(
  'users/updateUserCompanyInfo',
  async (initialState) => {
    const { _id, companyName, department, position, isIntern } = initialState;

    try {
      const response = await axios.put(`api/users/auth/${_id}`, {
        companyName,
        department,
        position,
        isIntern,
      });

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// update the current user school information
export const updateUserSchoolInfo = createAsyncThunk(
  'users/updateUserSchoolInfo',
  async (initialState) => {
    const { _id, schoolName, course, major, isIntern } = initialState;

    try {
      const response = await axios.put(`api/users/auth/${_id}`, {
        schoolName,
        course,
        major,
        isIntern,
      });

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// accept company offer
export const acceptCompanyOffer = createAsyncThunk(
  'users/acceptCompanyOffer',
  async (initialState) => {
    try {
      const { user_id, company_id } = initialState;

      const response = await axios.put(`api/users/${user_id}/${company_id}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// decline company offer
export const declineCompanyOffer = createAsyncThunk(
  'users/declineCompanyOffer',
  async (initialState) => {
    try {
      const { user_id, company_id } = initialState;

      const response = await axios.delete(`api/users/${user_id}/${company_id}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetState: (state) => {
      state.users = [];
      state.user_id = '';
      state.user = { isIntern: true };
      state.isAuthorized = true;
      state.status = 'idle';
      state.error = null;
    },
    updateUserDocs: (state, action) => {
      state.user = action.payload;
    },
  },
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
      })
      .addCase(updateUserProfileInfo.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(updateUserContactInfo.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(updateUserCompanyInfo.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(updateUserSchoolInfo.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(acceptCompanyOffer.fulfilled, (state, action) => {
        if (action.payload.user && action.payload.room) {
          state.user = action.payload.user;
        }
      })
      .addCase(declineCompanyOffer.fulfilled, (state, action) => {
        if (action.payload.user && action.payload.room) {
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
export const { resetState, updateUserDocs } = usersSlice.actions;

export default usersSlice.reducer;
