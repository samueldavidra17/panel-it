import { useContext, useEffect } from 'react';
import axios from "utils/axioIntance";
import { Grid } from '@mui/material';
import { InputTexto } from 'component/inputs';
import { contextForm } from 'context/contextForm';
import withModal from 'utils/withModal';
import { changeProperty, setState } from 'reducer/reducerForm';

function Form({ id, uri }) {
    const [state, dispatch] = useContext(contextForm);

    const getInfo = async () => {
        try {
            const info = await axios.get(`${uri}/${id}/`);
            dispatch(setState(info.data));
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
                    input={state.nombre}
                    label="Nombre"
                    accion={(value) => dispatch(changeProperty("nombre", value))}
                />
            </Grid>
        </Grid>
    );
}

export const FormOtros = withModal(Form)