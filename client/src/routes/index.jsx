import { Routes, Route } from 'react-router-dom';

import Home from '../view';
import LogInPage from '../view/login';
import SignUpPage from '../view/signup';
import ForgotPassword from '../view/password';

import RoomParent from '../view/room';
import InternshipList from '../view/internship';
import RoomWithId from '../view/room/RoomWithId';
import Rooms from '../view/room/Rooms';

import Dashboard from '../view/dashboard';
// newsfeed
import Newsfeed from '../view/newsfeed';
import PostsList from '../view/newsfeed/PostsList';
import SinglePost from '../view/newsfeed/SinglePost';

// video conferencing
import Video from '../view/video';

// tasks
import Tasks from '../view/tasks';
import TasksList from '../view/tasks/TasksList';
import PendingTask from '../view/tasks/PendingTask';
import CompletedTask from '../view/tasks/CompletedTask';
import SingleTask from '../view/tasks/SingleTask';

import Member from '../view/member';
import Attendance from '../view/attendance';

import Description from '../view/description';
import CompanySettings from '../view/company_settings';

import Personalize from '../view/settings';
import Profile from '../view/settings/Profile';
import Resume from '../view/settings/Resume';
import Invitation from '../view/settings/Invitation';
import Request from '../view/settings/Request';
import PageNotFound from '../view/404';

// admin
import AdminPage from '../admin';
import AdminDashboardPage from '../admin/dashboard';
import AdminLogReportsPage from '../admin/log';
import AdminInternPage from '../admin/intern';
import AdminCompanyPage from '../admin/company';
import AdminAttendancePage from '../admin/attendance';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='internship' element={<InternshipList />} />
      <Route path='room' element={<RoomParent />}>
        <Route index element={<Rooms />} />
        <Route path=':id' element={<RoomWithId />}>
          {/* edit the code inside this route */}
          <Route index element={<Dashboard />} />

          <Route path='newsfeed' element={<Newsfeed />}>
            <Route index element={<PostsList />} />
            <Route path=':id' element={<SinglePost />} />
          </Route>

          <Route path='tasks' element={<Tasks />}>
            <Route index element={<TasksList />} />
            <Route path='pending' element={<PendingTask />} />
            <Route path='completed' element={<CompletedTask />} />
            <Route path=':id' element={<SingleTask />} />
          </Route>

          <Route path='member' element={<Member />} />

          <Route path='attendance' element={<Attendance />} />

          <Route path='description' element={<Description />} />

          <Route path='settings' element={<CompanySettings />} />

          <Route path='video' element={<Video />} />
        </Route>
      </Route>
      <Route path='login' element={<LogInPage />} />
      <Route path='signup' element={<SignUpPage />} />
      <Route path='forgotpassword' element={<ForgotPassword />} />
      <Route path='settings' element={<Personalize />}>
        <Route index element={<PageNotFound />} />
        <Route path='account' element={<Profile />} />
        <Route path='resume' element={<Resume />} />
        <Route path='invitation' element={<Invitation />} />
        <Route path='request' element={<Request />} />
      </Route>

      <Route path='s_admin' element={<AdminPage />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path='logs' element={<AdminLogReportsPage />} />
        <Route path='interns' element={<AdminInternPage />} />
        <Route path='companies' element={<AdminCompanyPage />} />
        <Route path='attendances' element={<AdminAttendancePage />} />
      </Route>

      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};
export default AppRoutes;
