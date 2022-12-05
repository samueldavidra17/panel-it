import { useContext, useEffect, useState } from 'react';
import axios from "utils/axioIntance";
import { Grid } from '@mui/material'
import { InputSeleccionar, InputTexto } from '../inputs';
import { contextForm } from 'context/contextForm';
import { changeProperty, setState } from 'reducer/reducerForm';
import withModal from 'utils/withModal';
//componete formulario de las impresoras
function Form({ id }) {
  const [state, dispatch] = useContext(contextForm); // --> contexto con el estado de los formularios
  const changeImpresora = (property, value) => dispatch(changeProperty(property, value));
  //peticion de la impresora si se envia un id
  const getImpresora = async () => {
    try {
      const impresora = await axios.get(`impresoras/${id}/`);
      dispatch(setState(impresora.data));
    } catch (error) {
      console.log(error);
    }
  }
  // estado de opciones de los combox de tipo de impresora, departamentos, marcas, modelos
  const [opciones, setOpciones] = useState({});
  const [marcas, setMarcas] = useState([]);
  const [modelo, setModelo] = useState([]);

  const getOpciones = async () => {
    try {
      const departamentos = await axios.get('departamentos/'); 
      setOpciones({
        departamentos: departamentos.data
      });
    } catch (error) {
      console.log(error);
    }
  }
  const opcionesMarcas = async () => {
    try {
      const marcas = await axios.get('marcas/', { // --> filtro de marcas (solo impresoras)
        params: {
          search: "I"
        }
      })
      setMarcas(marcas.data);
    } catch (error) {
      console.log(error);
    }
  }
//peticion de marcas en base a la marca
  const opcionesModelos = async () => {
    try {
      const modelos = await axios.get('modelos/', { 
        params: { 
          tiposEquiposMarcas_id__marcas_id: state.marca_id,
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
    if (id) 
      getImpresora();
  }, []);
//peticion de los modelos al seleccionar una marca
  useEffect(() => {
    if(state.marca_id)
      opcionesModelos();
  }, [state.marca_id]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} sm={6}>
        <InputSeleccionar
          input={state.marca_id}
          label={"Marca"}
          opciones={marcas}
          accion={(value) => changeImpresora('marca_id', value)} 
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <InputSeleccionar
          input={state.modelo_id}
          label={"Modelo"}
          opciones={modelo}
          accion={(value) => changeImpresora('modelos', value)}
          desactivado={modelo.length > 0 ? false : true}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputSeleccionar
          input={state.departamento_id}
          label={"Departamento"}
          opciones={opciones.departamentos}
          accion={(value) => changeImpresora('departamento', value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputSeleccionar
          input={state.empresa_id || "No aplica"}
          label={"Tipo conexión"}
          opciones={["No aplica", "Red", "Usb", "Compartida"]}
          accion={(value) => changeImpresora('tipo_conexion', value)}
        />
      </Grid>
      <Grid item xs={12} sm={7}>
        <InputTexto
          input={state.serial}
          label={"Serial"}
          accion={(value) => changeImpresora('serial', value)}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <InputTexto
          input={state.csb}
          label={"CSB"}
          accion={(value) => changeImpresora('csb', value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputTexto
          input={state.toner}
          label={"Toner"}
          accion={(value) => changeImpresora('toner', value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputTexto
          input={state.ip}
          label={"Ip"}
          accion={(value) => changeImpresora('ip', value)}
        />
      </Grid>
    </Grid>
  );
}

export const FormImpresoras = withModal(Form);