import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios';
import "./instructorHome.css";

const InstructorHome = () => {

    const [courses, setCourses] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [approvals, setApprovals] = useState([]);

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
                    localStorage.removeItem('Email');
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
        try {
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

    const approvalNotification = async () => {
        let email = localStorage.getItem("Email");

        try {
            const url = '/notify-approval/' + email;

            const res = await axios.get(url, {
            })
                .then(function (res) {
                    setApprovals(res.data);
                })
        } catch (err) {
            console.log(err.response);
        }
    }

    const readApprovalNotification = async (fileName) => {
        try {
            const url = '/notify-approval/' + fileName;
            const res = await axios.delete(url, {
            })
                .then(function (res) {
                    approvalNotification();
                })
        } catch (err) {
            console.log(err.response.data);
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
        approvalNotification();
    });

    return (
        <div className='Instructor'>

            <nav>
                <Link to="/EditPDF">
                    <li>Edit/Create unapproved outlines</li>
                </Link>
                <Link to="/pdf">
                    <li>Edit/Create approved outlines</li>
                </Link>
                <Link to="/DisplayPdf">
                    <li>Previous Outlines</li>
                </Link>
                <Link to="/history">
                    <li>Outline History</li>
                </Link>
                <Link to="/RejectedOutlines">
                    <li>Rejected Outlines</li>
                </Link>
                <Link to="/login">
                    <li id="logout" onClick={logout}>Logout</li>
                </Link>
            </nav>

            <h1>Welcome {fname}!</h1>

            <div className='currentOutlines'>
                {courses?.length > 0
                    ? (
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
                <ul>
                    {
                        approvals?.length > 0
                            ? (
                                approvals.map(approval =>
                                    <li>PDF name:{approval.fileName}<p>Status:{approval.status}</p> <p>Comments:{approval.comment}</p><button className='del' id={approval.fileName} onClick={(event) => readApprovalNotification(approval.fileName)}>Clear</button></li>)
                            ) : (
                                <li>Check back later!</li>
                            )
                    }
                </ul>
            </div>

        </div>
    )
}

export default InstructorHome
