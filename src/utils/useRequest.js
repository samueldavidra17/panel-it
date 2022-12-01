import { useEffect, useState } from "react";
import axios from './axioIntance';

export function useRequest(uri){
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);

    const set = (value) => setData(value);
    
    const get = async (params = null) => {
        try {
            const res = await axios.get(uri, params ? { params } : null);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    }
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