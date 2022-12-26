import { useContext } from "react";
import { useEffect } from "react";
import axios from "utils/axioIntance";
import { Grid } from "@mui/material";
import { InputTexto } from "component/inputs";
import { contextForm } from "context/contextForm";
import { changeProperty, setState } from "reducer/reducerForm";
import withModal from "utils/withModal";
//componente formulario de modelos
function Form({ id }){
    const [state, dispatch] = useContext(contextForm); //--> contexto formularios
    //peticion del modelo en base a un id recibido
    const getModelo = async () =>{
        try {
            const modelo = await axios.get(`modelos/${id}/`);
            dispatch(setState(modelo.data));
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getModelo();
    }, []);

    return(
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

export const FormModelos = withModal(Form)