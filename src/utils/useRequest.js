import { useEffect, useState } from "react";
import axios from './axioIntance';
//Custom hook para las peticiones mas usadas a la api (get, post, put y paginacion)
//https://es.reactjs.org/docs/hooks-custom.html --> doc de react sobre los custom hooks

//Todas las peticiones de envio y recibiento de datos devuelven un mensaje de respuesta
//dependiendo del estado de la misma (normalmente usada para la notificaciones)
export function useRequest(uri){
    //estado con la informacion pedida y si esta cargada o no (futura mejora)
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);

    const set = (value) => setData(value);
    //peticion get que si recibe parametros de busqueda los genera
    const get = async (params = null) => {
        try {
            const res = await axios.get(uri, params ? { params } : null);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    //peticion get con paginacion
    //recibe el estado de la pagina
    const getPaginations = async (pagination, search = null) => {
        try {
            const res = await axios.get(uri, {
                params: {
                    limit: pagination.rowsPerPage,
                    offset: pagination.page * pagination.rowsPerPage,
                    search
                }
            });
            pagination.handleCount(res.data.count);
            setData(res.data.results);
        } catch (error) {
            console.log(error);
        }
    }

    const post = async (data) => {
        try {
            const res = await axios.post(uri, data);
            if(res.status !== 201)
                return { error: true, message: 'Ha ocurrido un error' };
            return { error: false, message: 'Se ha agregado un equipo nuevo' };                
        } catch (error) {
            console.log(error);
        }
    }

    const put = async (data) => {
        try {
            const res = await axios.put(`${uri+data.id}/`, data);
            if(res.status !== 200) 
                return { error: true, message: 'Ha ocurrido un error' };
            return { error: false, message: 'Se han actualizado los datos del equipo' };
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(data.length > 0) setLoad(true);
    }, []);

    return {
        data,
        load,
        get,
        getPaginations,
        set,
        post,
        put
    }
}