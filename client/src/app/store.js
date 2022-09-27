import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from '../features/companies/companiesSlice';
import filesReducer from '../features/files/filesSlice';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    files: filesReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});
