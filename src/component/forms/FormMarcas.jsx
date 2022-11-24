import { useContext, useEffect, useState } from "react";
import axios from 'utils/axioIntance';
import { Stack } from "@mui/system";
import { Chip, Grid, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { InputTexto } from "component/inputs";
import { contextFormMarcas } from "context/contextFormMarca";
import { changePropertyMarca, setMarca } from "reducer/reducerMarca";

export function FormMarcas({ id, tipoEquipos }) {
    const [state, dispatch] = useContext(contextFormMarcas);
    
    const changeMarca = (property, value) => dispatch(changePropertyMarca({ property, value }))
    const getMarca = async () => {
        try {
            const marca = await axios.get(`marcas/${id}`);
            dispatch(setMarca({ ...marca.data, tipoEquipos}));
        } catch (error) {
            console.log(error);
        }
    }

    const [model, setModel] = useState(" ");

    const addModelList = () => {
        state.modelos.push(model);
        dispatch(changePropertyMarca({ property: "modelos", value: [...state.modelos] }));
        setModel(" ");
    };

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