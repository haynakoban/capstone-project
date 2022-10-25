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
import { createNewDailyAttendance } from './features/attendances/attendancesSlice';
import { DailyAttendanceDateFormatter } from './lib/DateFormatter';

function App() {
  const dispatch = useDispatch();
  const _isUserAuth = useSelector(isUserAuthorized);
  const _user = useSelector(getUserInfo);
  const socket = useRef();

  // handle visible routes
  useEffect(() => {
    dispatch(isUserLoggedIn()).unwrap();
  }, [dispatch]);

  // handle socket io and add user
  useEffect(() => {
    if (_user?._id) {
      // handle socket io
      socket.current = io(SERVER_URL, { withCredentials: true });
      socket.current?.emit('add_user', _user?._id);
    }
  }, [_user?._id]);

  // handle join room
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

  // handle attendance in time
  useEffect(() => {
    if (_user?.internInfo?.companyInfo?.hasCompany) {
      const date = new Date();

      if (date.getDay() !== 0) {
        dispatch(
          createNewDailyAttendance({
            id: _user?.internInfo?.companyInfo?.company_id,
            attendance_date: DailyAttendanceDateFormatter(date),
            status: 'Present',
            user_id: _user?._id,
            in_time: date,
          })
        );
      }
    }
  }, [
    _user?.internInfo?.companyInfo?.hasCompany,
    _user?.internInfo?.companyInfo?.company_id,
    _user?._id,
    dispatch,
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
