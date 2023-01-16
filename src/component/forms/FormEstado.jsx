import { useContext, useEffect, useState } from 'react';
import axios from "utils/axioIntance";
import { Grid } from '@mui/material';
import { InputSeleccionar, InputTexto } from '../inputs';
import { contextForm } from 'context/contextForm';
import { changeProperty, setState } from 'reducer/reducerForm';
import withModal from 'utils/withModal';
//componente formulario para el cambio de estado de informacion de los equipos
//(estatus, asignacion, ubicacion y observaciones)
function Form({ id }) {
  const [state, dispatch] = useContext(contextForm); // --> contexto form
  //funcion para cambiar una propiedad del json en el reducer del contexto en base a una propiedad dada en el input
  const changeInformacion = (property, value) => dispatch(changeProperty(property, value));

  //peticion para traer la informacion de un equipo/impresora en caso de enviar id
  const getInformacion= async () => {
    try {
      const res = await axios.get(`estado/${id}/`);
      dispatch(setState(res.data));
    } catch (error) {
      console.log(error);
    }
  }
  //estado para las opciones de los combox 
  const [opciones, setOpciones] = useState({});
  
  const getOpciones = async () => {
    try {
      const combox = await axios.get('combox/');
      const ubicaciones = await axios.get('ubicaciones/')
      setOpciones({
        ...combox.data,
        ubicaciones: ubicaciones.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getInformacion();
    getOpciones();
  }, []);

  return (
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4}>
          <InputSeleccionar 
            input={state.estatus}
            label={"Estatus"} 
            opciones={opciones.Estatus}
            accion={(value) => changeInformacion('estatus', value)}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <InputSeleccionar 
            input={state.asignacion}
            label={"Asignación"} 
            opciones={opciones.Asignaciones}
            accion={(value) => changeInformacion('asignacion', value)}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <InputSeleccionar 
            input={state.ubicaciones}
            label={"Ubicación"} 
            opciones={opciones.ubicaciones} 
            accion={(value) => changeInformacion('ubicaciones', value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputTexto 
            input={state.observacion}
            label={"Observaciones"} 
            accion={(value) => changeInformacion('observacion', value)}
          />
        </Grid>
      </Grid>
  );
}

export const FormEstado = withModal(Form);