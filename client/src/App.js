import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  const [socket, setSocket] = useState(null);

  // handle visible routes
  useEffect(() => {
    dispatch(isUserLoggedIn()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    if (_user?._id) {
      // handle socket io
      setSocket(io(SERVER_URL, { withCredentials: true }));
    }
  }, [_user?._id]);

  return (
    <div className='App'>
      <AuthContext.Provider value={{ _isUserAuth, _user, socket, setSocket }}>
        <Router>
          <AppRoutes />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
