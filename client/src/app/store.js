import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '../features/comments/commentsSlice';
import companiesReducer from '../features/companies/companiesSlice';
import filesReducer from '../features/files/filesSlice';
import postsReducer from '../features/posts/postsSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    companies: companiesReducer,
    files: filesReducer,
    posts: postsReducer,
    tasks: tasksReducer,
    users: usersReducer,
  },
});
