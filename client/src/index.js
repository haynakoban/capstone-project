import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { store } from './app/store';
import { Provider } from 'react-redux';

import './styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import theme from './lib/theme';
import { ThemeProvider } from '@mui/material/styles';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
