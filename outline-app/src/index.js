import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
      <Route path = "/login" exact element = {<Login />}></Route>
      <Route path = "/register" exact element = {<Register />}></Route>

      <Route path = "*" element = {<Login />}></Route>
  </Routes>
  </BrowserRouter>
);


