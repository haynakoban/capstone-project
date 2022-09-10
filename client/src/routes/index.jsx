import { Routes, Route } from 'react-router-dom';

import Home from '../view';
import LogInPage from '../view/login';
import SignUpPage from '../view/signup';
import RoomParent from '../view/room';
import InternshipList from '../view/internship';
import RoomWithId from '../view/room/RoomWithId';
import Rooms from '../view/room/Rooms';

import Dashboard from '../view/dashboard';
// newsfeed
import Newsfeed from '../view/newsfeed';
import PostsList from '../view/newsfeed/PostsList';
import SinglePost from '../view/newsfeed/SinglePost';

// tasks
import Tasks from '../view/tasks';
import TasksList from '../view/tasks/TasksList';
import SingleTask from '../view/tasks/SingleTask';

import Files from '../view/files';
import Member from '../view/member';
import Attendance from '../view/attendance';

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
            <Route path=':id' element={<SingleTask />} />
          </Route>

          <Route path='files' element={<Files />} />

          <Route path='member' element={<Member />} />

          <Route path='attendance' element={<Attendance />} />
        </Route>
      </Route>
      <Route path='login' element={<LogInPage />} />
      <Route path='signup' element={<SignUpPage />} />
    </Routes>
  );
};
export default AppRoutes;
