import { useContext, useEffect, useState } from 'react';
import axios from "utils/axioIntance";
import { Grid } from '@mui/material'
import { InputSeleccionar, InputTexto } from '../inputs';
import { contextFormImpresoras } from 'context/contextFormImpresoras';
import { changePropertyImpresora, setImpresora } from 'reducer/reducerImpresora';

export function FormImpresoras({ id }) {
  const [state, dispatch] = useContext(contextFormImpresoras);
  const { impresora } = state;
  const changeImpresora = (property, value) => {
    dispatch(changePropertyImpresora({ property, value }));
  }

  const getImpresora = async () => {
    try {
      const impresora = await axios.get(`impresoras/${id}/`);
      const res = {...impresora.data, modelosforeignkey: impresora.data.modelo_id, usuariosforeignkey: impresora.data.usuario.id}
      dispatch(setImpresora(res));
    } catch (error) {
      console.log(error);
    }
  }

  const [opciones, setOpciones] = useState({});
  const [marcas, setMarcas] = useState([]);
  const [modelo, setModelo] = useState([]);

  const getOpciones = async () => {
    try {
      const departamentos = await axios.get('departamentos/');
      const combox = await axios.get('combox/');
      setOpciones({
        ...combox.data,
        departamentos: departamentos.data
      });
    } catch (error) {
      console.log(error);
    }
  }
  const opcionesMarcas = async () => {
    try {
      const marcas = await axios.get('marcas/', {
        params: {
          search: "I"
        }
      })
      setMarcas(marcas.data);
    } catch (error) {
      console.log(error);
    }
  }

  const opcionesModelos = async () => {
    try {
      const modelos = await axios.get('modelos/', { 
        params: { 
          tiposEquiposMarcas_id__marcas_id: impresora.marca_id,
        } 
      });
      setModelo(modelos.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOpciones();
    opcionesMarcas();
    if (id) {
      getImpresora();
    }
  }, []);

  useEffect(() => {
    if(impresora.marca_id){
      opcionesModelos();
    }
  }, [impresora.marca_id]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} sm={6}>
        <InputSeleccionar
          input={impresora ? impresora.marca_id : null}
          label={"Marca"}
          opciones={marcas}
          accion={(value) => changeImpresora('marca_id', value)} 
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <InputSeleccionar
          input={impresora ? impresora.modelo_id : null}
          label={"Modelo"}
          opciones={modelo}
          accion={(value) => changeImpresora('modelos', value)}
          desactivado={modelo.length > 0 ? false : true}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputSeleccionar
          input={impresora ? impresora.departamento_id : null}
          label={"Departamento"}
          opciones={opciones.departamentos}
          accion={(value) => changeImpresora('departamento', value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputSeleccionar
          input={impresora ? impresora.empresa_id : null}
          label={"Tipo conexión"}
          opciones={["No aplica", "Red", "Usb", "Compartida"]}
          accion={(value) => changeImpresora('tipo_conexion', value)}
        />
      </Grid>
      <Grid item xs={12} sm={7}>
        <InputTexto
          input={impresora ? impresora.serial : null}
          label={"Serial"}
          accion={(value) => changeImpresora('serial', value)}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <InputTexto
          input={impresora ? impresora.csb : null}
          label={"CSB"}
          accion={(value) => changeImpresora('csb', value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputTexto
          input={impresora ? impresora.toner : null}
          label={"Toner"}
          accion={(value) => changeImpresora('toner', value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputTexto
          input={impresora ? impresora.ip : null}
          label={"Ip"}
          accion={(value) => changeImpresora('ip', value)}
        />
      </Grid>
    </Grid>
  );
}