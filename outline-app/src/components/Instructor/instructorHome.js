import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios';
import "./instructorHome.css";

const InstructorHome = () => {

    const [courses, setCourses] = useState([]);
    const [firstName, setFirstName] = useState("");

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

    // Get notification
    const notification = async () => {

        // Split the name into first name and last name
        let name = localStorage.getItem("Name");
        let nameStruct = name.split(" ");
        let fName = nameStruct[0];
        let lName = nameStruct[1];

        // Get the list of the new course outlines using fname and lname params
        try{
            const url = '/new-outline/' + fName + "/" + lName;

            const res = await axios.get(url, {
            })
            .then(function (res) {
                setCourses(res.data);
            })

        } catch (err) {
            console.log(err.response);
        }

    }

    const readNotification = async (courseCode) => {

        // The passed parameter "courseCode" is functioning properly

        try {
            const url = '/new-outline/' + courseCode;
            const res = await axios.delete(url, {       // The route is called properly
            })
            .then(function (res) {
                notification();
            })
        } catch (err) {
            console.log(err.response.data);
        }

    }

    useEffect(() => {
        notification();
    });

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
                {courses?.length > 0 
                    ?   (
                            <h3>New Course Outlines!</h3>
                        ) : (
                            <h3>There are no new outlines!</h3>
                        )
                }

                <ul>

                    {
                        courses?.length > 0
                        ? (
                            courses.map((course) => 
                            <li>{course.name}<button className='del' id={course.name} onClick={(event) => readNotification(course.name)}>Clear</button></li>
                        )) : (
                            <li>Check back later!</li>
                        )
                    }

                </ul>
            </div>

        </div>
    )
}

export default InstructorHome
