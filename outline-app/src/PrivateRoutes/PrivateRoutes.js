import React, { useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom'
import axios from 'axios';
import CurrentUser from '../CurrentUser/CurrentUser';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null) 
    CurrentUser();
    let user = {
      name: localStorage.getItem('Name'),
      position: localStorage.getItem('Position')
    }

    let credentials = {};

    useEffect(() => {
      const url = `/requireauth`;

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
            if(children === "base") {
              setIsAuthenticated(true);
            } else {
            switch(children[1] === user.position) {
              case true:
                setIsAuthenticated(true);
                break;
              case false:
                setIsAuthenticated(false);
                logout();
                break;
              default:
                setIsAuthenticated(false);
                logout();
                break;
            }}
            break;
          case 400:
            setIsAuthenticated(false);
            logout();
            break;
          default:
            setIsAuthenticated(false);
            logout();
            break;
        }
      }

      getValid();
    }, [])

    if(isAuthenticated === null){
      return <></>
    } 

    async function logout() {
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

    return (children == "base") ? 
    (isAuthenticated ? 
      (localStorage.getItem("Position") == "admin") ? 
        <Navigate to = '/login'/>
        :<Navigate to = {`/instructor`}/> 
      :<Navigate to = '/login'/>)
    : isAuthenticated ? children[0] :  <Navigate to = '/login'/>;
};

export default PrivateRoute
