import { useContext, useEffect, useState } from 'react';
import axios from "utils/axioIntance";
import { Grid } from '@mui/material'
import { InputSeleccionar, InputTexto } from '../inputs';
import { contextForm } from 'context/contextForm';
import { changeProperty, setState } from 'reducer/reducerForm';
import withModal from 'utils/withModal';

function Form({ id }) {
    const [state, dispatch] = useContext(contextForm);
    const changeDispositivo = (property, value) => dispatch(changeProperty(property, value));

    const getDispositivo = async () => {
        try {
            const dispositivo = await axios.get(`dispositivos/${id}/`);
            dispatch(setState(dispositivo.data));
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
            const tipos = await axios.get('tiposequipos/', {
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

    useEffect(() => {
        getOpciones();
        if (id) {
            getDispositivo();
        }
    }, []);

    useEffect(() => {
        if (state.tipo_dispositivo_id) {
            opcionesMarcas(state.tipo_dispositivo_id);
        }
    }, [state.tipo_dispositivo_id]);

    useEffect(() => {
        if (state.marca_id) {
            opcionesModelos(state.marca_id);
        }
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

export const FormDispositivos = withModal(Form);