import { useContext, useEffect, useState } from 'react';
import axios from "utils/axioIntance";
import { Autocomplete, Grid, TextField } from '@mui/material';
import { contextForm } from 'context/contextForm';
import { changeProperty } from 'reducer/reducerForm';
import withModal from 'utils/withModal';
//componete formulario para asignar usuarios
//https://mui.com/material-ui/react-autocomplete/#main-content --> doc componente Autocomplete
function Form() {
    const [state, dispatch] = useContext(contextForm); // --> contexto del formEquipos 
    const [opciones, setOpciones] = useState([]);
    //peticion de los usuarios registrados
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
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <Autocomplete
                    freeSolo
                    options={opciones}
                    //busqueda de los usuarios en el TextField
                    getOptionLabel={(option) => `${option.nombre} - ${option.empresa} - ${option.departamento}`}
                    renderOption={(props, option, { selected }) => (
                        /*renderizado de los usuarios de forma de una lista*/
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
                    onChange={(e, value) => dispatch(changeProperty("usuarios", value.id))}
                />
            </Grid>
        </Grid>
    );
}

export const FormAsignarUsuarios = withModal(Form);