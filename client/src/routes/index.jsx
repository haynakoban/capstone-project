import { Routes, Route } from 'react-router-dom';

import Home from '../view';
import LogInPage from '../view/login';
import SignUpPage from '../view/signup';
import Room from '../view/room';
import InternshipList from '../view/internship';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='internship' element={<InternshipList />} />
      <Route path='room' element={<Room />} />
      <Route path='login' element={<LogInPage />} />
      <Route path='signup' element={<SignUpPage />} />
    </Routes>
  );
};
export default AppRoutes;
