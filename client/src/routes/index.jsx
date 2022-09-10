import { Routes, Route } from 'react-router-dom';

import Home from '../view';
import LogInPage from '../view/login';
import SignUpPage from '../view/signup';
import RoomParent from '../view/room';
import InternshipList from '../view/internship';
import RoomWithId from '../view/room/RoomWithId';
import Rooms from '../view/room/Rooms';
// import Dashboard from '../view/dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='internship' element={<InternshipList />} />
      <Route path='room' element={<RoomParent />}>
        <Route index element={<Rooms />} />
        <Route path=':id' element={<RoomWithId />}>
          {/* edit the code inside this route */}
          <Route index element={<Home />} />
          <Route path='files' element={<Home />} />
        </Route>
      </Route>
      <Route path='login' element={<LogInPage />} />
      <Route path='signup' element={<SignUpPage />} />
    </Routes>
  );
};
export default AppRoutes;
