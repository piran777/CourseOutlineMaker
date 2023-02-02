import React, { useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom'
import axios from 'axios';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)  

    let credentials = {};

    useEffect(() => {
      const url = `http://localhost:4200/requireauth`;

      async function getValid() {
        try {
          const res = await axios.get(url,{
            withCredentials: true
          })
          .then(function (response) {
            credentials = response.status;
          })
        } catch (err) {
          console.log(err)
        }

        switch(credentials) {
          case 200:
            setIsAuthenticated(true);
            break;
          case 400:
            setIsAuthenticated(false);
            break;
          default:
            setIsAuthenticated(false);
            break;
        }
      }

      getValid();
    }, [])

    if(isAuthenticated === null){
      return <></>
    } 

    return isAuthenticated ? children :  <Navigate to = '/login'/>;
};

export default PrivateRoute
