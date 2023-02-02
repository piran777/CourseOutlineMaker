import React, { useEffect, useState} from 'react';
import { Route, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useJwt } from "react-jwt";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)  

  const { decodedToken } = useJwt('jwt');

  useEffect(() => {
    const token = Cookies.get('jwt');
    
    if(token){
        if(decodedToken) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    } else {
       setIsAuthenticated(false)
    }
  }, [])

  if(isAuthenticated === null){
    return <></>
  } 

  return isAuthenticated ? children :  <Navigate to = '/login'/>;
};

export default PrivateRoute
