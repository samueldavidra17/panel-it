import axios from "axios";

const intance = axios.create({
    validateStatus: function (status) {
        return status >= 200 && status < 500
      }
});

intance.defaults.baseURL = 'http://172.17.244.183:8000/api/';

export default intance