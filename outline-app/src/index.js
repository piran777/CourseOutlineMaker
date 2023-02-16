import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import PrivateRoute from './PrivateRoutes/PrivateRoutes';
import CurrentUser from './CurrentUser/CurrentUser';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import InstructorHome from './components/Instructor/instructorHome';
import AssignInstructor from './components/AssignInstructor/AssignInstructor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path = '/' element = {<CurrentUser></CurrentUser>}/>
        <Route path = "/login" element = {<Login />} component = {CurrentUser}/>
        <Route path = "/register" element = {<Register />}/>
        <Route path = "/pdf" exact element = {<App />}></Route>
        <Route path = "/test" element = {<PrivateRoute><Register /></PrivateRoute>}/>  
        <Route path = "/instructor/:fname" element = {<InstructorHome />} />
        <Route path = "/assign-instructor" element = {<AssignInstructor />}/>
    </Routes>
  </BrowserRouter>
);