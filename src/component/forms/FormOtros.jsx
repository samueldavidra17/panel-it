import { useContext, useEffect } from 'react';
import axios from "utils/axioIntance";
import { Grid } from '@mui/material';
import { InputTexto } from 'component/inputs';
import { contextForm } from 'context/contextForm';
import withModal from 'utils/withModal';
import { changeProperty, setState } from 'reducer/reducerForm';
//componente formulario de otros registros
//(asignaciones, estatus, sistemas operativos, ubicaciones...)
function Form({ id, uri }) {
    const [state, dispatch] = useContext(contextForm); // --> contexto formulario 
    //peticion del registro que se desea actualizar en caso tal
    //en base a una uri (tipo de registro) recibida y el id del mismo
    const getInfo = async () => {
        try {
            const info = await axios.get(`${uri}/${id}/`);
            dispatch(setState(info.data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(id) 
            getInfo();
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