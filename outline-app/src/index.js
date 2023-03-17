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
import InstructorHome from './components/Instructor/instructorHome';
import AssignInstructor from './components/AssignInstructor/AssignInstructor';
import AdminReview from './components/AdminReview/AdminReview';
import AdminHome from './components/AdminHome/AdminHome';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path = '/' element = {<CurrentUser></CurrentUser>}/>
        <Route path = "/login" element = {<Login />} component = {CurrentUser}/>
        <Route path = "/register" element = {<Register />}/>
        <Route path = "/pdf" exact element = {<PrivateRoute><App />instructor</PrivateRoute>}></Route> 
        <Route path = "/instructor/:fname" element = {<PrivateRoute><InstructorHome />instructor</PrivateRoute>} />
        <Route path = "/assign-instructor" element = {<PrivateRoute><AssignInstructor />admin</PrivateRoute>}/>
        <Route path = "/DisplayPdf" exact element = {<DisplayPdf />}></Route>
        <Route path = "/EditPDF" exact element = {<PrivateRoute><EditPDF />instructor</PrivateRoute>}></Route>
        <Route path = "/ReviewPDF" element = {<PrivateRoute><AdminReview />admin</PrivateRoute>}/>
        <Route path = "/admin-home" element = {<PrivateRoute><AdminHome />admin</PrivateRoute>}/>

    </Routes>
  </BrowserRouter>
);

