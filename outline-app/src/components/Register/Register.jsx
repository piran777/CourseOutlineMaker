import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import './register.css';

export default function Index() {
    const navigate = useNavigate();

    const [info, setInfo] = useState({email: '', firstName: '', lastName: '', password: '', position: 'instructor'});

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = {};

        //Reset Errors

        try {
            const url = `http://localhost:4200/signup`;

            const res = await axios.post(url, {
                email: info.email, 
                firstName: info.firstName, 
                lastName: info.lastName, 
                password: info.password,
                position: info.position,
            }, {
                withCredentials: true
            })
            .then(function (response) {
                data = response.data;
            })

            if(data) {
                //Redirects to home page
                console.log(data);
            }

        } catch (err) {
            console.log(err.response.data.errors);

            if(err.response.data.errors) {
                //List errors
            }
        }
    }

    const handleChange = ({ currentTarget: input }) => {
        setInfo({...info,[input.name]: input.value });
    }

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <h1>Register</h1>
                <label htmlFor = "firstName">First Name</label>
                <input type="text" name = "firstName" onChange={handleChange} value = {info.firstName} required />
                <div className="firstName_error"></div>

                <label htmlFor = "lastName">Last Name</label>
                <input type="text" name = "lastName" onChange={handleChange} value = {info.lastName} required />
                <div className="lastName_error"></div>

                <label htmlFor = "email">Email</label>
                <input type="text" name = "email" onChange={handleChange} value = {info.email} required />
                <div className="email_error"></div>

                <label htmlFor="password">Password</label>
                <input type="password" name = "password" onChange={handleChange} value = {info.password} required />
                <div className="password_error"></div>

                <button>Sign up</button>
            </form>
        </div>
    )
}