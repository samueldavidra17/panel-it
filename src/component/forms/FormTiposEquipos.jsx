import { useContext, useState } from 'react';
import axios from "utils/axioIntance";
import { Grid } from '@mui/material';
import { InputTexto } from 'component/inputs';
import { useEffect } from 'react';
import { contextForm } from 'context/contextForm';
import { changeProperty, setState } from 'reducer/reducerForm';
import withModal from 'utils/withModal';

function Form( { id }) {

    const [state, dispatch] = useContext(contextForm);
    
    const getTipoEquipo = async () => {
        try {
            const tipoEquipo = await axios.get(`tiposequipos/${id}/`);
            dispatch(setState(tipoEquipo.data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(id) getTipoEquipo();
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