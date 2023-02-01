import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

export default function Index() {
    const navigate = useNavigate();

    const [info, setInfo] = useState({email: '', firstName: '', lastName: '', password: ''});

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:4200/signup`;

            const res = await axios.post(url, {
                email: info.email, 
                firstName: info.firstName, 
                lastName: info.lastName, 
                password: info.password
            })
            .then(function (response) {
                console.log(response);
              })
        } catch (err) {
            console.log(err);
        }
        console.log(info);
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
                <div className="firstName error"></div>

                <label htmlFor = "lastName">Last Name</label>
                <input type="text" name = "lastName" onChange={handleChange} value = {info.lastName} required />
                <div className="lastName error"></div>

                <label htmlFor = "email">Email</label>
                <input type="text" name = "email" onChange={handleChange} value = {info.email} required />
                <div className="email error"></div>

                <label htmlFor="password">Password</label>
                <input type="password" name = "password" onChange={handleChange} value = {info.password} required />
                <div className="password error"></div>

                <button>Sign up</button>
            </form>
        </div>
    )
}