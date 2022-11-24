import { useContext, useEffect, useState } from "react";
import axio from "utils/axioIntance";
import { contextFormEmpresasDepartamentos } from "context/contextFormEmpresasDepartamentos";
import { InputTexto } from "component/inputs";
import { changePropertyEmpresa, changePropertyDepartamento, setEmpresa, setDepartamento } from "reducer/reducerEmpresaDepartamento";
import { Autocomplete, Checkbox, Grid, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export function FormEmpresasDepartamentos({ title, id }) {
    const [state, dispatch] = useContext(contextFormEmpresasDepartamentos);
    const [opciones, setOpciones] = useState([]);

    const validarContent = title === "Empresas";
    const getOrganizacion = async () => {
        try {
            const organizacion = await axio.get(validarContent ? `empresas/${id}/` : `departamentos/${id}/`);
            dispatch(validarContent ? setEmpresa(organizacion.data) : setDepartamento(organizacion.data));
        } catch (error) {
            console.log(error);
        }
    }
    const getOpciones = async () => {
        try {
            const opciones = await axio.get(validarContent ? "departamentos/" : "empresas/");
            setOpciones(opciones.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOpciones();
        if (id) getOrganizacion();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <InputTexto
                    input={validarContent ? state.empresa.nombre : state.departamento.nombre}
                    label="Nombre"
                    accion={(value) =>
                        dispatch(validarContent ?
                            changePropertyEmpresa({ value, property: "nombre" })
                            :
                            changePropertyDepartamento({ value, property: "nombre" })
                        )}
                />
            </Grid>
            {
                !id
                    ? <Grid item xs={12} sm={12}>
                        <Autocomplete
                            multiple
                            disableCloseOnSelect
                            id="checkboxes-tags-demo"
                            options={opciones}
                            // defaultValue={validarContent ? state.empresa.empresasDepartamentos : state.departamento.empresas}
                            getOptionLabel={(option) => option.nombre}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        key={option.id}
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.nombre}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={validarContent ? "Departamentos" : "Empresas"}
                                    placeholder={validarContent ? "Departamento..." : "Empresas..."}
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                            onChange={(e, value) => {
                                const id = value.map((i) => i.id);
                                dispatch(validarContent ?
                                    changePropertyEmpresa({ value: id, property: "empresasDepartamentos" })
                                    :
                                    changePropertyDepartamento({ value: id, property: "empresas" }))
                            }}
                        />
                    </Grid>
                    :
                    null
            }
        </Grid>
    );
}