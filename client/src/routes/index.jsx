import { Routes, Route } from 'react-router-dom';

import Home from '../view';
import LogInPage from '../view/login';
import SignUpPage from '../view/signup';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='login' element={<LogInPage />} />
      <Route path='signup' element={<SignUpPage />} />
    </Routes>
  );
};
export default AppRoutes;
