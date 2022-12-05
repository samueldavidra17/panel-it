import { useContext, useEffect, useState } from 'react';
import axios from "utils/axioIntance";
import { Grid } from '@mui/material'
import { InputSeleccionar, InputTexto } from '../inputs';
import { contextFormEquipos } from 'context/contextFormEquipos';
import { changePropertyEquipo, setEquipo } from 'reducer/reducerEquipo';
//componete formulario de los equipos
export function FormEquipos({ id }) {
  const [state, dispatch] = useContext(contextFormEquipos); // --> contexto con el estado del form de equipos
  const { equipo } = state; // --> se estrae el equipo solamente
  const changeEquipo = (property, value) => dispatch(changePropertyEquipo({ property, value }));
  //peticion del equipo en caso de que se envie un id
  //se modifica el json a recibir para poder realizar el envio adecuado
  const getEquipo = async () => {
    try {
      const equipo = await axios.get(`equipos/${id}/`);
      const res = {...equipo.data, modelosforeignkey: equipo.data.modelo_id, usuariosforeignkey: equipo.data.usuario.id}
      dispatch(setEquipo(res));
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
          tiposEquiposMarcas: equipo.tipoEquipos_id
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
          tiposEquiposMarcas_id__tiposEquipos_id: equipo.tipoEquipos_id,
          tiposEquiposMarcas_id__marcas_id: equipo.marca_id,

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
    if(equipo.tipoEquipos_id)
      opcionesMarcas();
  }, [equipo.tipoEquipos_id]);
  //peticion de los modelos al seleccionar una marca
  useEffect(() => {
    if(equipo.marca_id){
      opcionesModelos();
    }
  }, [equipo.marca_id]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} sm={4}>
        <InputSeleccionar
          input={equipo ? equipo.tipoEquipos_id : null}
          label={"Tipo Equipo"}
          opciones={opciones.tiposEquipos}
          accion={(value) => changeEquipo('tipoEquipos_id', value)}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <InputSeleccionar
          input={equipo ? equipo.marca_id : null}
          label={"Marca"}
          opciones={marcas}
          accion={(value) => changeEquipo('marca_id', value)} 
          desactivado={marcas.length > 0 ? false : true}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <InputSeleccionar
          input={equipo ? equipo.modelo_id : null}
          label={"Modelo"}
          opciones={modelo}
          accion={(value) => changeEquipo('modelos', value)}
          desactivado={modelo.length > 0 ? false : true}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <InputSeleccionar
          input={equipo ? equipo.tipo_ram : null}
          label={"Tipo Ram"}
          opciones={opciones.tiposRam}
          accion={(value) => changeEquipo('tipo_ram', value)}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <InputTexto
          input={equipo ? equipo.ram : null}
          label={"Ram"}
          adornment={"GB"}
          accion={(value) => changeEquipo('ram', value)}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <InputTexto
          input={equipo ? equipo.dd : null}
          label={"Disco Duro"}
          adornment={"GB"}
          accion={(value) => changeEquipo('dd', value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputSeleccionar
          input={equipo ? equipo.empresa_id : null}
          label={"Empresas"}
          opciones={opciones.empresas}
          accion={(value) => changeEquipo('empresas', value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputTexto
          input={equipo ? equipo.usuario_so : null}
          label={"Nombre Equipo"}
          accion={(value) => changeEquipo('usuario_so', value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <InputTexto
          input={equipo ? equipo.csb : null}
          label={"CSB"}
          accion={(value) => changeEquipo('csb', value)}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <InputTexto
          input={equipo ? equipo.serial : null}
          label={"Serial"}
          accion={(value) => changeEquipo('serial', value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputTexto
          input={equipo ? equipo.serial_unidad : null}
          label={"Serial Unidad"}
          accion={(value) => changeEquipo('serial_unidad', value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputTexto
          input={equipo ? equipo.serial_cargador : null}
          label={"Serial Cargador"}
          accion={(value) => changeEquipo('serial_cargador', value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <InputTexto
          input={equipo ? equipo.antivirus : null}
          label={"Antivirus"}
          accion={(value) => changeEquipo('antivirus', value)}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <InputSeleccionar
          input={equipo ? equipo.so : null}
          label={"Sistema Operativo"}
          opciones={opciones.so}
          accion={(value) => changeEquipo('so', value)}
        />
      </Grid>
    </Grid>
  );
}
