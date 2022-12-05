import { useContext, useEffect, useState } from "react";
import axios from 'utils/axioIntance';
import { Stack } from "@mui/system";
import { Chip, Grid, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { InputTexto } from "component/inputs";
import { contextFormMarcas } from "context/contextFormMarca";
import { changePropertyMarca, setMarca } from "reducer/reducerMarca";
//componente formulario marcas
export function FormMarcas({ id, tipoEquipos }) {
    const [state, dispatch] = useContext(contextFormMarcas); //--> contexto con el estado del formulario de marcas
    //funcion para cambiar una propiedad del json en el reducer del contexto en base a una propiedad dada en el input
    const changeMarca = (property, value) => dispatch(changePropertyMarca({ property, value }))
    //peticion para una marca en caso de que se envie un id
    const getMarca = async () => {
        try {
            const marca = await axios.get(`marcas/${id}/`);
            dispatch(setMarca({ ...marca.data, tipoEquipos}));
        } catch (error) {
            console.log(error);
        }
    }
    //estado para agregar nuevo modelo en la lista del formulario
    const [model, setModel] = useState(" ");
    //funcion para agregar un nuevo modelo
    const addModelList = () => {
        state.modelos.push(model);
        dispatch(changePropertyMarca({ property: "modelos", value: [...state.modelos] }));
        setModel(" ");
    };
    //funcion para remover un nuevo modelo
    const removeModelList = (index) => {
        state.modelos.splice(index, 1);
        dispatch(changePropertyMarca({ property: "modelos", value: [...state.modelos] }));
    }

    useEffect(() => {
        if (id) getMarca();
        dispatch(setMarca({ ...state, tipoEquipos}));
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
                        state.modelos.map((model, index) => (
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