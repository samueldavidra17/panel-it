import axios from "axios";

const intance = axios.create({
    validateStatus: function (status) {
        return status >= 200 && status < 500
      },
      headers: {
        Authorization: `Token ${sessionStorage.getItem('token')}` 
      }
});

// intance.defaults.withCredentials = true; 
intance.defaults.baseURL = 'http://localhost:8000/api/';

export default intance