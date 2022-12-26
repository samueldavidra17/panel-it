import { useContext, useEffect, useState } from "react";
import axio from "utils/axioIntance";
import { InputTexto } from "component/inputs";
import { contextForm } from "context/contextForm";
import { changeProperty, setState } from "reducer/reducerForm";
import { Autocomplete, Checkbox, Grid, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import withModal from "utils/withModal";
//componente formulario de empresas y departamentos
//https://mui.com/material-ui/react-autocomplete/#multiple-values --> doc del componente autocomplete con multiple opciones
 function Form({ title, id }) {
    const [state, dispatch] = useContext(contextForm); // --> contexto fomulario 
    const [opciones, setOpciones] = useState([]); // --> estados de las opciones para seleccionar (departamentos o empresas)
    //valida si esta agregando/editanto, empresas o departamentos 
    const validarContent = title === "Empresas";
    const getOrganizacion = async () => {
        try {
            //peticion de la empresa o departamento si recibe un id
            const organizacion = await axio.get(`${title.toLowerCase()}/${id}/`);
            dispatch(setState(organizacion.data));
        } catch (error) {
            console.log(error);
        }
    }
    const getOpciones = async () => {
        try {
            //peticion de las empresas o departamentos para seleccionar 
            const opciones = await axio.get(validarContent ? "departamentos/" : "empresas/");
            setOpciones(opciones.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOpciones();
        if (id) 
            getOrganizacion();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <InputTexto
                    input={state.nombre}
                    label="Nombre"
                    accion={(value) => dispatch(changeProperty("nombre", value))}

                />
            </Grid>
            {
                // si no recibe un id para modificar muestra la lista de
                // las empresas o departamentos
                !id
                    ? <Grid item xs={12} sm={12}>
                        <Autocomplete
                            multiple
                            disableCloseOnSelect
                            id="checkboxes-tags-demo"
                            options={opciones}
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
                                dispatch(changeProperty(validarContent ? "empresasDepartamentos" : "empresas", id))
                            }}
                        />
                    </Grid>
                    : null
            }
        </Grid>
    );
}

export const FormEmpresasDepartamentos = withModal(Form);