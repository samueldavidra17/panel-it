import { useContext, useEffect, useState } from 'react';
import axios from "utils/axioIntance";
import { Grid } from '@mui/material'
import { InputSeleccionar, InputTexto } from '../inputs';
import { contextForm } from 'context/contextForm';
import { changeProperty, setState } from 'reducer/reducerForm';
import withModal from 'utils/withModal';
//componete formulario de los equipos
function Form({ id }) {
  const [state, dispatch] = useContext(contextForm); // --> contexto con el estado del form de equipos
  const changeEquipo = (property, value) => dispatch(changeProperty(property, value));
  //peticion del equipo en caso de que se envie un id
  //se modifica el json a recibir para poder realizar el envio adecuado
  const getEquipo = async () => {
    try {
      const equipo = await axios.get(`equipos/${id}/`);
      delete equipo.data.informacion;
      delete equipo.data.historial;
      dispatch(setState(equipo.data));
    } catch (error) {
      console.log(error);
    }
  }
  // estado de opciones de los combox de tipo de quipo, empresas, marcas, modelos
  // y valores estandar (tipo de ram, sistemas operativos...)
  const [opciones, setOpciones] = useState({});
  const [marcas, setMarcas] = useState([]);
  const [modelo, setModelo] = useState([]);

  const getOpciones = async () => {
    try {
      const equipos = await axios.get('tiposequipos/',{ // --> filtro de tipos de equipos (solo equipos)
        params: {
          search: "E"
        }
      });
      const empresas = await axios.get('empresas/');
      const combox = await axios.get('combox/');
      setOpciones({
        ...combox.data,
        tiposEquipos: equipos.data,
        empresas: empresas.data
      });
    } catch (error) {
      console.log(error);
    }
  }
  //peticion de marcas en base al tipo de equipo
  const opcionesMarcas = async () => {
    try {
      const marcas = await axios.get('marcas/', {
        params: {
          tiposEquiposMarcas: state.tipoEquipos_id
        }
      });
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
          tiposEquiposMarcas_id__tiposEquipos_id: state.tipoEquipos_id,
          tiposEquiposMarcas_id__marcas_id: state.marca_id,

        } 
      });
      setModelo(modelos.data);
    } catch (error) {
      console.log(error);
    }
  }
  //peticion de opciones en los combox, si se encuentra un id se pide el dipositivo
  useEffect(() => {
    getOpciones();
    if (id) 
      getEquipo();
  }, []);
  //peticion de las marcas al seleccionar un tipo de equipo
  useEffect(() => {
    if(state.tipoEquipos_id)
      opcionesMarcas();
  }, [state.tipoEquipos_id]);
  //peticion de los modelos al seleccionar una marca
  useEffect(() => {
    if(state.marca_id){
      opcionesModelos();
    }
  }, [state.marca_id]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} sm={4}>
        <InputSeleccionar
          input={state.tipoEquipos_id}
          label={"Tipo Equipo"}
          opciones={opciones.tiposEquipos}
          accion={(value) => changeEquipo('tipoEquipos_id', value)}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <InputSeleccionar
          input={state.marca_id}
          label={"Marca"}
          opciones={marcas}
          accion={(value) => changeEquipo('marca_id', value)} 
          desactivado={marcas.length > 0 ? false : true}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <InputSeleccionar
          input={state.modelo_id}
          label={"Modelo"}
          opciones={modelo}
          accion={(value) => changeEquipo('modelos', value)}
          desactivado={modelo.length > 0 ? false : true}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <InputSeleccionar
          input={state.tipo_ram}
          label={"Tipo Ram"}
          opciones={opciones.tiposRam}
          accion={(value) => changeEquipo('tipo_ram', value)}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <InputTexto
          input={state.ram}
          label={"Ram"}
          adornment={"GB"}
          accion={(value) => changeEquipo('ram', value)}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <InputTexto
          input={state.dd}
          label={"Disco Duro"}
          adornment={"GB"}
          accion={(value) => changeEquipo('dd', value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputSeleccionar
          input={state.empresa_id}
          label={"Empresas"}
          opciones={opciones.empresas}
          accion={(value) => changeEquipo('empresas', value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputTexto
          input={state.usuario_so}
          label={"Nombre Equipo"}
          accion={(value) => changeEquipo('usuario_so', value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <InputTexto
          input={state.csb}
          label={"CSB"}
          accion={(value) => changeEquipo('csb', value)}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <InputTexto
          input={state.serial}
          label={"Serial"}
          accion={(value) => changeEquipo('serial', value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputTexto
          input={state.serial_unidad}
          label={"Serial Unidad"}
          accion={(value) => changeEquipo('serial_unidad', value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputTexto
          input={state.serial_cargador}
          label={"Serial Cargador"}
          accion={(value) => changeEquipo('serial_cargador', value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <InputTexto
          input={state.antivirus}
          label={"Antivirus"}
          accion={(value) => changeEquipo('antivirus', value)}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <InputSeleccionar
          input={state.so}
          label={"Sistema Operativo"}
          opciones={opciones.so}
          accion={(value) => changeEquipo('so', value)}
        />
      </Grid>
    </Grid>
  );
}

export const FormEquipos = withModal(Form);