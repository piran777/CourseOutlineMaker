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
            switch(children[1] === user.position) {
              case true:
                setIsAuthenticated(true);
                break;
              case false:
                setIsAuthenticated(false);
                break;
              default:
                setIsAuthenticated(false);
                break;
            }
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

    return isAuthenticated ? children[0] :  <Navigate to = '/login'/>;
};

export default PrivateRoute
