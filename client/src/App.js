import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import './App.css';
import AppRoutes from './routes';
import { AuthContext } from './lib/authContext';
import { SERVER_URL } from './lib/axiosConfig';
import {
  getUserInfo,
  isUserAuthorized,
  isUserLoggedIn,
} from './features/users/usersSlice';

function App() {
  const dispatch = useDispatch();
  const _isUserAuth = useSelector(isUserAuthorized);
  const _user = useSelector(getUserInfo);
  const socket = useRef();

  // handle visible routes
  useEffect(() => {
    dispatch(isUserLoggedIn()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    if (_user?._id) {
      // handle socket io
      socket.current = io(SERVER_URL, { withCredentials: true });
      socket.current?.emit('add_user', _user?._id);
    }
  }, [_user?._id]);

  useEffect(() => {
    if (_user?.internInfo?.companyInfo?.hasCompany) {
      socket.current?.emit(
        'join_room',
        _user?.internInfo?.companyInfo?.company_id
      );
    } else if (_user?.employeeInfo?.listOfCompanies?.length > 0) {
      const companies = _user?.employeeInfo?.listOfCompanies?.map(
        ({ company_id }) => company_id
      );

      socket.current?.emit('join_room', companies);
    }
  }, [
    _user?.internInfo?.companyInfo?.hasCompany,
    _user?.employeeInfo?.listOfCompanies,
    _user?.internInfo?.companyInfo?.company_id,
    socket,
  ]);

  return (
    <div className='App'>
      <AuthContext.Provider value={{ _isUserAuth, _user, socket }}>
        <Router>
          <AppRoutes />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
