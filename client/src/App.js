import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes';
import { AuthContext } from './lib/authContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserInfo,
  isUserAuthorized,
  isUserLoggedIn,
} from './features/users/usersSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const _isUserAuth = useSelector(isUserAuthorized);
  const _user = useSelector(getUserInfo);

  // handle visible routes
  useEffect(() => {
    dispatch(isUserLoggedIn()).unwrap();
  }, [dispatch]);

  return (
    <div className='App'>
      <AuthContext.Provider value={{ _isUserAuth, _user }}>
        <Router>
          <AppRoutes />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
