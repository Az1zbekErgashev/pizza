import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Provider } from 'react-redux';
import { store } from './components/Redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/SiteBar/LoginPage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Provider  store={store}>
  <Routes>
    <Route index element={<App/>} path=''/>
    <Route  path='/login' element={<LoginPage/>} />
  </Routes>
    </Provider>
  </BrowserRouter>
  </React.StrictMode>
);

