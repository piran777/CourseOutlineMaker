import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import './Login.css'

export default function Index() {
    const navigate = useNavigate();

    const [login, setLogin] = useState({email: '', password: ''});

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = {};

        try {
            const url = `/login`;

            const res = await axios.post(url, {
                email: login.email, 
                password: login.password
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
            console.log(err.response.data);

            if(err.response.data.errors) {
                //List errors
            }
        }
    }

    const handleChange = ({ currentTarget: input }) => {
        setLogin({...login,[input.name]: input.value });
    }

    return (
        <div className='Login'>
            <form onSubmit = {handleSubmit}>
                <h1>Log In</h1>
                <label htmlFor = "email">Email</label>
                <input type="text" name = "email" onChange={handleChange} value = {login.email} required />
                <div className="email error"></div>

                <label htmlFor="password">Password</label>
                <input type="password" name = "password" onChange={handleChange} value = {login.password} required />
                <div className="password error"></div>

                <button>Log In</button>
            </form>
        </div>
    )
}