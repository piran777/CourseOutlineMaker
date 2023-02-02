import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import PrivateRoute from './PrivateRoutes/PrivateRoutes';
import CurrentUser from './CurrentUser/CurrentUser';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
      <Route path = '/' element = {<CurrentUser></CurrentUser>}/>
      <Route path = "/login" element = {<Login />} component = {CurrentUser}/>
      <Route path = "/register" element = {<Register />}/>

      <Route path = "/test" element = {<PrivateRoute><Register /></PrivateRoute>}/>
      
      
  </Routes>
  </BrowserRouter>
);