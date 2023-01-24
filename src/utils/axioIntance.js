import axios from "axios";

const token = sessionStorage.getItem('token');
const Authorization =  token ? { Authorization: `Token ${token}` } : {}
//instancia de axios para la peticiones a la misma api (url - back)
//y con el token almacenado en el session storage del navegador
const intance = axios.create({
    withCredentials: false,
    validateStatus: (status) => status >= 200 && status < 500, // --> permite la respuesta con status entre 200 y 500
      headers: {
        "Access-Control-Allow-Origin": '*',
        ...Authorization
      } 
});

intance.defaults.baseURL = process.env.REACT_APP_API_URL+'api/'; // --> url back api

export default intance