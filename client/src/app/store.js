import { configureStore } from '@reduxjs/toolkit';
import attendancesReducer from '../features/attendances/attendancesSlice';
import commentsReducer from '../features/comments/commentsSlice';
import companiesReducer from '../features/companies/companiesSlice';
import filesReducer from '../features/files/filesSlice';
import logsReducer from '../features/logs/logsSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import postsReducer from '../features/posts/postsSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    attendances: attendancesReducer,
    comments: commentsReducer,
    companies: companiesReducer,
    files: filesReducer,
    logs: logsReducer,
    notifications: notificationsReducer,
    posts: postsReducer,
    tasks: tasksReducer,
    users: usersReducer,
  },
});
