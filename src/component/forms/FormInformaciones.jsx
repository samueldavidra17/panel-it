import { useContext, useState } from 'react';
import axios from "utils/axioIntance";
import { Grid } from '@mui/material';
import { InputTexto } from 'component/inputs';
import { contextFormInformacion } from 'context/contextInformacion';
import { useEffect } from 'react';

export function FormInformaciones( { id, content }) {
    const [state, changeState] = useContext(contextFormInformacion);

    const getInfo = async () => {
        try {
            const info = await axios.get(`/${content.toLowerCase().replace(/\s+/g, '')}/${id}/`);
            changeState(info.data.nombre);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(id) getInfo();
    }, [id]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <InputTexto
                    input={state}
                    label="Nombre"
                    accion={changeState}
                />
            </Grid>
        </Grid>
    );
}
