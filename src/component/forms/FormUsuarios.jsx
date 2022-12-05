import { useContext, useEffect, useState } from 'react';
import axios from "utils/axioIntance";
import { Grid } from '@mui/material'
import { InputSeleccionar, InputTexto } from '../inputs';
import { contextForm } from 'context/contextForm';
import withModal from 'utils/withModal';
import { changeProperty, setState } from 'reducer/reducerForm';
//componente formulario de usuarios
function Form({ id }) {
    const [state, dispatch] = useContext(contextForm); // --> contexto del estado de los formularios
    //funcion para cambiar una propiedad del estado en base a un parametro en el input
    const changeUsuario = (property, value) => dispatch(changeProperty(property, value));
    //peticion del usuario en caso de recibir un id
    const getUsuario = async () => {
        try {
            const usuario = await axios.get(`usuarios/${id}/`);
            dispatch(setState(usuario.data));
        } catch (error) {
            console.log(error);
        }
    }
    //estado de las opciones para los combox
    //(departamentos y empresas)
    const [opciones, setOpciones] = useState({});
    const getOpciones = async () => {
        try {
            const empresas = await axios.get('empresas/');
            setOpciones({...opciones, empresas: empresas.data});
        } catch (error) {
            console.log(error);
        }
    }
    
    const opcionesDepartamentos = async (value) => {
        try {
            const departamentos = await axios.get('departamentos/', { // --> filtro de los depatamentos en base a la empresa
                params: { empresas: value } 
            });
            setOpciones({ ...opciones, departamentos: departamentos.data });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOpciones();
        if (id) {
            getUsuario();
        }
    }, []);
    //peticion de los departamentos al seleccionar una empresa
    useEffect(() => {
        if(state.departamento) 
            opcionesDepartamentos(state.empresa)
    }, [state.departamento]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <InputSeleccionar
                    input={state.empresa}
                    label={"Empresas"}
                    opciones={opciones.empresas}
                    accion={(value) => {
                        changeUsuario('empresa', value);
                        opcionesDepartamentos(value);
                    }}
                />
            </Grid>
             <Grid item xs={12} sm={6}>
                <InputSeleccionar
                    input={state.departamento}
                    label={"Departamentos"}
                    opciones={opciones.departamentos}
                    accion={(value) => changeUsuario('departamento', value)}
                    desactivado={!opciones.departamentos}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputTexto
                    input={state.nombre}
                    label={"Nombre y Apellido"}
                    accion={(value) => changeUsuario('nombre', value)}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputTexto
                    input={state.cargo}
                    label={"Cargo"}
                    accion={(value) => changeUsuario('cargo', value)}
                />
            </Grid>
        </Grid>
    );
}

export const FormUsuarios = withModal(Form);