import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios';

async function CurrentUser() {
    const location = useLocation();

    let user = {};


    const url = `/checkuser`;

    async function getValid() {
      try {
        const res = await axios.get(url,{
          withCredentials: true
        })
        .then(async function (response) {
          user = response.data;
          await setStorage();
        })
      } catch (err) {
        setStorage();
        console.log(err)
      }
    }

    getValid();


    function setStorage() {
      localStorage.setItem('Name', user.firstName + ' ' + user.lastName);
      localStorage.setItem('Position', user.position);
    }

    return user.name;
};

export default CurrentUser
