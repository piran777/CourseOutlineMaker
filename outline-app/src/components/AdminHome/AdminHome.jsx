import { useEffect } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios';
import "./AdminHome.css";

const AdminHome = () => {

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
        <div className='AdminHome'>

            <h1>Welcome Admin!</h1>

            <div className='navigation'>
                <nav>
                    <Link to="/assign-instructor">
                        <li>Assign Instructors</li>
                    </Link>
                    <Link to="/ReviewPDF">
                        <li id="review">Review PDF</li>
                    </Link>
                    <Link to="/login">
                        <li id="logout" onClick={logout}>Logout</li>
                    </Link>
                </nav>
            </div>

        </div>
    )
}

export default AdminHome