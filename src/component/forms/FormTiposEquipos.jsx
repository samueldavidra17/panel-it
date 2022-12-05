import { useContext, useState } from 'react';
import axios from "utils/axioIntance";
import { Grid } from '@mui/material';
import { InputTexto } from 'component/inputs';
import { useEffect } from 'react';
import { contextForm } from 'context/contextForm';
import { changeProperty, setState } from 'reducer/reducerForm';
import withModal from 'utils/withModal';

const choiseId = ['E','I','D'];
//componente formulario de tipos de equipos
function Form({ id }) {

    const [state, dispatch] = useContext(contextForm); // --> contexto con el estado de los formularios
    //peticion del tipo de equipo en caso de recibir un id 
    const getTipoEquipo = async () => {
        try {
            const tipoEquipo = await axios.get(`tiposequipos/${id}/`);
            dispatch(setState(tipoEquipo.data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        //si el id recibido es una letra se se setea el estado con el id para seleccionar
        // el tipo de equipo a registrar (equipo, impresora o dispositivo)
        if(id && !choiseId.includes(id)) 
            getTipoEquipo();
        else //en caso contrario se hace la peticion
            dispatch(setState({id}))
    }, [id]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <InputTexto
                    input={state.nombre}
                    label="Nombre"
                    accion={(value) => dispatch(changeProperty("nombre", value))}
                />
            </Grid>
        </Grid>
    );
}

export const FormTiposEquipos = withModal(Form);