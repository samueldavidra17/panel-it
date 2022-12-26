import { useContext, useEffect, useState } from "react";
import axios from 'utils/axioIntance';
import { Stack } from "@mui/system";
import { Chip, Grid, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { InputTexto } from "component/inputs";
import { contextForm } from "context/contextForm";
import { changeProperty, setState } from 'reducer/reducerForm';
import withModal from "utils/withModal";
//componente formulario marcas
function Form({ id, tipoEquipos }) {
    const [state, dispatch] = useContext(contextForm); //--> contexto formulario
    //funcion para cambiar una propiedad del json en el reducer del contexto en base a una propiedad dada en el input
    const changeMarca = (property, value) => dispatch(changeProperty(property, value))
    //peticion para una marca en caso de que se envie un id
    const getMarca = async () => {
        try {
            const marca = await axios.get(`marcas/${id}/`);
            console.log(marca.data)
            dispatch(setState({ ...marca.data, tipoEquipos, modelos: []}));
        } catch (error) {
            console.log(error);
        }
    }
    //estado para agregar nuevo modelo en la lista del formulario
    const [model, setModel] = useState(" ");
    //funcion para agregar un nuevo modelo
    const addModelList = () => {
        state.modelos.push(model);
        dispatch(changeProperty("modelos", [...state.modelos] ));
        setModel(" ");
    };
    //funcion para remover un nuevo modelo
    const removeModelList = (index) => {
        state.modelos.splice(index, 1);
        dispatch(changeProperty("modelos", [...state.modelos] ));
    }

    useEffect(() => {
        if (id) getMarca();
        else dispatch(setState({ ...state, tipoEquipos, modelos: []}));
    }, [tipoEquipos])

    return (
        <Grid
            container
            columnSpacing={5}
            rowSpacing={3}
        >
            <Grid item sm={6}>
                <Grid
                    container
                    columnSpacing={3}
                    rowSpacing={3}
                >
                    <Grid item sm={12}>
                        <InputTexto
                            input={state.nombre}
                            label="Nombre"
                            accion={(value) => changeMarca('nombre', value)}
                        />
                    </Grid>
                    <Grid item sm={10}>
                        <InputTexto
                            input={model}
                            label="Modelo"
                            accion={setModel}
                        />
                    </Grid>
                    <Grid item sm={2}>
                        <IconButton onClick={addModelList}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={6}>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>Modelos</Typography>
                <Stack direction="row" spacing={2}>
                    {
                        state?.modelos?.map((model, index) => (
                            <Chip
                                label={model}
                                // funcion para editar un modelo en la lista
                                onClick={() => {
                                    setModel(model);
                                    removeModelList(index)
                                }}
                                onDelete={() => removeModelList(index)}
                            />
                        ))
                    }
                </Stack>
            </Grid>
        </Grid>
    );
}

export const FormMarcas = withModal(Form);