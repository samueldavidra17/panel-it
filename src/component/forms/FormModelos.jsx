import axios from "utils/axioIntance";
import { Grid } from "@mui/material";
import { InputTexto } from "component/inputs";
import { contextFormModelos } from "context/contextFormModelos";
import { useContext } from "react";
import { changePropertyModelo, setModelo } from "reducer/reducerModelo";
import { useEffect } from "react";
//componente formulario de modelos
export function FormModelos({ id }){
    const [state, dispatch] = useContext(contextFormModelos); //--> contexto del formulario de modelos
    //peticion del modelo en base a un id recibido
    const getModelo = async () =>{
        try {
            const modelo = await axios.get(`modelos/${id}/`);
            dispatch(setModelo(modelo.data));
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
                    accion={(value) => dispatch(changePropertyModelo({property: "nombre", value}))}
                />
            </Grid>
        </Grid>
    );
} 