import { useContext, useEffect, useState } from 'react';
import axios from "utils/axioIntance";
import { Autocomplete, Grid, TextField } from '@mui/material';
import { contextFormEquipos } from 'context/contextFormEquipos';
import { changeUsuario } from 'reducer/reducerEquipo';

export function FormAsignarUsuarios() {
    const [state, dispatch] = useContext(contextFormEquipos);
    const [opciones, setOpciones] = useState([]);

    const getOpciones = async () => {
        try {
            const usuarios = await axios.get('usuarios/');
            setOpciones(usuarios.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getOpciones();
    }, [])
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <Autocomplete
                    freeSolo
                    options={opciones}
                    getOptionLabel={(option) => `${option.nombre} - ${option.empresa} - ${option.departamento}`}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            {`${option.nombre} - ${option.empresa} - ${option.departamento}`}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Usuarios"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                    onChange={(e, value) => dispatch(changeUsuario(value.id))}
                />
            </Grid>
        </Grid>
    );
}
