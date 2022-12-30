import axios from "axios";
//instancia de axios para la peticiones a la misma api (url - back)
//y con el token almacenado en el session storage del navegador
const intance = axios.create({
    withCredentials: false,
    validateStatus: (status) => status >= 200 && status < 500, // --> permite la respuesta con status entre 200 y 500
      headers: {
        Authorization: `Token ${sessionStorage.getItem('token')}` 
      }
});

intance.defaults.baseURL = 'http://172.17.245.162:8000/api/'; // --> url back api

export default intance