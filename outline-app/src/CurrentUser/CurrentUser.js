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
            console.log(response);
            user = response.data;
          })
        } catch (err) {
          console.log(err)
        }
      }

      getValid();
    }, [location.key])

    return;
};

export default CurrentUser
