import { useContext, useEffect, useState } from 'react';
import axios from "utils/axioIntance";
import { contextFormEquipos } from 'context/contextFormEquipos';
import { Grid } from '@mui/material'
import { InputSeleccionar, InputTexto } from '../inputs';
import { changePropertyInformacion, setInformacion } from 'reducer/reducerEquipo';

export function FormInformacion({ id }) {
  const [state, dispatch] = useContext(contextFormEquipos);
  const { informacion } = state;
  const changeInformacion = (property, value) => {
    dispatch(changePropertyInformacion({ property, value }));
  }
  
  const getInformacion= async () => {
    try {
      const informacion = await axios.get(`informacion/${id}/`);
      const res = {...informacion.data, ubicaciones: informacion.data.ubicaciones.id}
      dispatch(setInformacion(res));
    } catch (error) {
      console.log(error);
    }
  }

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
            input={informacion ? informacion.estatus : null}
            label={"Estatus"} 
            opciones={opciones.estatus}
            accion={(value) => changeInformacion('estatus', value)}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <InputSeleccionar 
            input={informacion ? informacion.asignacion : null}
            label={"Asignación"} 
            opciones={opciones.asignaciones}
            accion={(value) => changeInformacion('asignacion', value)}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <InputSeleccionar 
            input={informacion ? informacion.ubicaciones : null}
            label={"Ubicación"} 
            opciones={opciones.ubicaciones} 
            accion={(value) => changeInformacion('ubicaciones', value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputTexto 
            input={informacion ? informacion.observacion : null}
            label={"Observaciones"} 
            accion={(value) => changeInformacion('observacion', value)}
          />
        </Grid>
      </Grid>
  );
}
