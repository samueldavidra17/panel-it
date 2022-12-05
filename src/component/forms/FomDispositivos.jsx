import { useContext, useEffect, useState } from 'react';
import axios from "utils/axioIntance";
import { Grid } from '@mui/material'
import { InputSeleccionar, InputTexto } from '../inputs';
import { contextForm } from 'context/contextForm';
import { changeProperty, setState } from 'reducer/reducerForm';
import withModal from 'utils/withModal';
//componete formulario de los dispositivos
function Form({ id }) {
    const [state, dispatch] = useContext(contextForm); // --> contexto con el estado de los formularios
    //funcion para cambiar un valor del estado del dispositivo
    const changeDispositivo = (property, value) => dispatch(changeProperty(property, value)); 
    //peticion al api para la peticion de un dispositivo
    const getDispositivo = async () => {
        try {
            const dispositivo = await axios.get(`dispositivos/${id}/`);
            dispatch(setState(dispositivo.data));
        } catch (error) {
            console.log(error);
        }
    }

    const [opciones, setOpciones] = useState({}); // --> estado de las opciones de los comboxBox de tipos equipos y departamentos
    const [marcas, setMarcas] = useState([]); // --> estado de las opciones del comboxBox de marcas
    const [modelo, setModelo] = useState([]); // --> estado de las opciones del comboxBox de modelo

    const getOpciones = async () => {
        try {
            const departamentos = await axios.get('departamentos/');
            const tipos = await axios.get('tiposequipos/', { //--> peticion de los tipos equipos filtrando solo los dispositivos
                params: {
                    search: "D"
                }
            });
            setOpciones({
                tipos: tipos.data,
                departamentos: departamentos.data
            });
        } catch (error) {
            console.log(error);
        }
    }
    const opcionesMarcas = async (value) => {
        try {
            //--> peticion de las marcas filtrando solo los dispositivos y su tipo
            const marcas = await axios.get('marcas/', { 
                params: {
                    tiposEquiposMarcas: value
                }
            })
            setMarcas(marcas.data);
        } catch (error) {
            console.log(error);
        }
    }

    const opcionesModelos = async (value) => {
        try {
            //--> peticion de los modelos filtrando solo los dispositivos por su marca
            const modelos = await axios.get('modelos/', {
                params: {
                    tiposEquiposMarcas_id__marcas_id: value
                }
            });
            setModelo(modelos.data);
        } catch (error) {
            console.log(error);
        }
    }
    //ejecucion de opciones en los combox, si se encuentra un id se pide el dipositivo
    useEffect(() => {
        getOpciones();
        if (id) 
            getDispositivo();
    }, []);
    //ejecicion de las marcas al seleccionar un tipo de equipo
    useEffect(() => {
        if (state.tipo_dispositivo_id) 
            opcionesMarcas(state.tipo_dispositivo_id);
    }, [state.tipo_dispositivo_id]);
    //ejecicion de las marcas al seleccionar una marca
    useEffect(() => {
        if (state.marca_id) 
            opcionesModelos(state.marca_id);
    }, [state.marca_id]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={6} sm={4}>
                <InputSeleccionar
                    input={state.tipo_dispositivo_id}
                    label={"Tipo Dispositivo"}
                    opciones={opciones.tipos}
                    accion={(value) => opcionesMarcas(value)}
                />
            </Grid>
            <Grid item xs={6} sm={4}>
                <InputSeleccionar
                    input={state.marca_id}
                    label={"Marca"}
                    opciones={marcas}
                    accion={(value) => opcionesModelos(value)}
                    desactivado={!marcas}
                />
            </Grid>
            <Grid item xs={6} sm={4}>
                <InputSeleccionar
                    input={state.modelo_id}
                    label={"Modelo"}
                    opciones={modelo}
                    accion={(value) => changeDispositivo('modelos', value)}
                    desactivado={!modelo}
                />
            </Grid>
            <Grid item xs={12} sm={7}>
                <InputTexto
                    input={state.serial}
                    label={"Serial"}
                    accion={(value) => changeDispositivo('serial', value)}
                />
            </Grid>
            <Grid item xs={12} sm={5}>
                <InputTexto
                    input={state.csb}
                    label={"CSB"}
                    accion={(value) => changeDispositivo('csb', value)}
                />
            </Grid>
        </Grid>
    );
}
//se usa el HOC de withModal para el renderizado del componente dentro de un modal y su logica
export const FormDispositivos = withModal(Form);