import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const CurrentUser = () => {
    const location = useLocation();

    let user = {};

    useEffect(() => {
      const url = `http://localhost:4200/checkuser`;

      async function getValid() {
        try {
          const res = await axios.get(url,{
            withCredentials: true
          })
          .then(function (response) {
            user = response.data;
            setStorage();
          })
        } catch (err) {
          setStorage();
          console.log(err)
        }
      }

      getValid();
    }, [location.key])

    function setStorage() {
      sessionStorage.setItem('Name', user.firstName + ' ' + user.lastName);
      sessionStorage.setItem('Position', user.position);
    }

    return;
};

export default CurrentUser
