import { configureStore } from '@reduxjs/toolkit';
// import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import companiesReducer from '../features/companies/companiesSlice';
import filesReducer from '../features/files/filesSlice';

export const store = configureStore({
  reducer: {
    // posts: postsReducer,
    users: usersReducer,
    companies: companiesReducer,
    files: filesReducer,
  },
});
