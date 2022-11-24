import { useContext, useEffect, useState } from 'react';
import axios from "utils/axioIntance";
import { Grid } from '@mui/material'
import { InputSeleccionar, InputTexto } from '../inputs';
import { contextFormUsuarios } from 'context/contextFormUsuarios';
import { changePropertyUsuario, setUsuario } from 'reducer/reducerUsuario';

export function FormUsuarios({ id }) {
    const [usuario, dispatch] = useContext(contextFormUsuarios);

    const changeUsuario = (property, value) => {
        dispatch(changePropertyUsuario({ property, value }));
    }

    const getUsuario = async () => {
        try {
            const usuario = await axios.get(`usuarios/${id}/`);
            dispatch(setUsuario(usuario.data));
        } catch (error) {
            console.log(error);
        }
    }

    const [opciones, setOpciones] = useState({});
    const getOpciones = async () => {
        try {
            const empresas = await axios.get('empresas/');
            setOpciones({empresas: empresas.data});
        } catch (error) {
            console.log(error);
        }
    }

    const opcionesDepartamentos = async (value) => {
        try {
            const departamentos = await axios.get('departamentos/', { 
                params: { empresas: value } 
            });
            setOpciones({ ...opciones, departamentos: departamentos.data });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOpciones();
        if (id) {
            getUsuario();
        }
    }, []);

    useEffect(() => {
        if(usuario.departamentoId){
            opcionesDepartamentos(usuario.empresaId);
        }
    }, [usuario.departamentoId]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <InputSeleccionar
                    input={usuario.empresaId ? usuario.empresaId : null}
                    label={"Empresas"}
                    opciones={opciones.empresas}
                    accion={(value) => {
                        changeUsuario('empresa', value);
                        opcionesDepartamentos(value);
                    }}
                />
            </Grid>
             <Grid item xs={12} sm={6}>
                <InputSeleccionar
                    input={usuario.departamentoId ? usuario.departamentoId : null}
                    label={"Departamentos"}
                    opciones={opciones.departamentos}
                    accion={(value) => changeUsuario('departamento', value)}
                    desactivado={opciones.departamentos || usuario.departamentoId ? false : true}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputTexto
                    input={usuario.nombre ? usuario.nombre : null}
                    label={"Nombre y Apellido"}
                    accion={(value) => changeUsuario('nombre', value)}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputTexto
                    input={usuario.cargo ? usuario.cargo : null}
                    label={"Cargo"}
                    accion={(value) => changeUsuario('cargo', value)}
                />
            </Grid>
        </Grid>
    );
}
