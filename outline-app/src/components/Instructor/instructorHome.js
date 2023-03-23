import { useEffect } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios';
import "./instructorHome.css";

const InstructorHome = () => {

    const location = useLocation();
    const { fname } = useParams();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const url = '/logout';

            const res = await axios.get(url, {
            })
            .then(function (response) {
                localStorage.removeItem('Name');
                localStorage.removeItem('Position');
            })
        } catch (err) {
            console.log(err.response.data);
        }
    }

    return (
        <div className='Instructor'>

            <nav>
                <Link to="/pdf">
                    <li>Create Outline</li>
                </Link>
                <Link to="/DisplayPdf">
                    <li>Previous Outlines</li>
                </Link>
                <Link to="/EditPDF">
                    <li>Unapproved Outlines</li>
                </Link>
                <Link to="/history">
                    <li>Outline History</li>
                </Link>
                <Link to="/login">
                    <li id="logout" onClick={logout}>Logout</li>
                </Link>
            </nav>

            <h1>Welcome { fname }!</h1>

            <div className='currentOutlines'>
                <h3>Current Class Outlines</h3>
                <ul>
                    <li>Class 1<button className='open'>Open</button><button className='del'>Delete</button></li>
                    <li>Class 2<button className='open'>Open</button><button className='del'>Delete</button></li>
                    <li>Class 3<button className='open'>Open</button><button className='del'>Delete</button></li>
                    <li>Class 4<button className='open'>Open</button><button className='del'>Delete</button></li>
                </ul>
            </div>

        </div>
    )
}

export default InstructorHome
