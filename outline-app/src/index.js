import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import DisplayPdf from './DisplayPdf';
import EditPDF from './EditPDF';
import PrivateRoute from './PrivateRoutes/PrivateRoutes';
import CurrentUser from './CurrentUser/CurrentUser';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AssignInstructor from './components/AssignInstructor/AssignInstructor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
      <Route path = '/' element = {<CurrentUser></CurrentUser>}/>
      <Route path = "/login" element = {<Login />} component = {CurrentUser}/>
      <Route path = "/register" element = {<Register />}/>
      <Route path = "/assign-instructor" element = {<AssignInstructor />}/>

      <Route path = "/pdf" exact element = {<App />}></Route>

      <Route path = "/test" element = {<PrivateRoute><Register /></PrivateRoute>}/>
      <Route path = "/DisplayPdf" exact element = {<DisplayPdf />}></Route>
      <Route path = "/EditPDF" exact element = {<EditPDF />}></Route>
      
      
  </Routes>
  </BrowserRouter>
);

