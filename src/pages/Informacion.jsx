import { useEffect, useState } from "react";
import { 
    Button, 
    Grid, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemText, 
    Paper, 
    Radio, 
    RadioGroup, 
    Typography } from "@mui/material";
import { Container } from "@mui/system";
import Alerts, { useAlerts } from "component/Alerts";
import { InputSeleccionar } from "component/inputs";
import Modal, { useModal } from "component/Modal";
import { FormInformaciones } from 'component/forms';
import ProviderFormInformacion, { contextFormInformacion } from "context/contextInformacion";
import { useRequest } from "utils/useRequest";

const opciones = [
    {
        id: "asignaciones",
        nombre: "Asignaciones"
    },
    {
        id: "estatus",
        nombre: "Estatus"
    },
    {
        id: "sistemasoperativos",
        nombre: "Sistemas Operativos"
    },
    {
        id: "tiposram",
        nombre: "Tipos Ram"
    },
    {
        id: "ubicaciones",
        nombre: "Ubicaciones"
    },
]

export function Informacion() {
    const [content, setContent] = useState("asignaciones");
    
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(1);

    const modalState = useModal();
    const alertState = useAlerts();
    
    const { data: lista, get: getLista, post: postInfo, put: putInfo } = useRequest(content+'/'); 

    useEffect(() => {
        getLista();
    }, [content]);

    return (
        <Grid
            container
            spacing={3}
            alignItems="center"
            justify="center"
        >
            <Grid item sm={6}>
                <Button
                    variant="outlined"
                    sx={{ marginRight: 2 }}
                    onClick={() => modalState.handleOpen()}
                >
                    Agregar
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setEdit(true);
                        modalState.handleOpen();
                    }}
                >
                    Actualizar
                </Button>
            </Grid>
            <Grid item sm={6}>
                <InputSeleccionar
                    input={content}
                    label="Informaciones"
                    opciones={opciones}
                    accion={(value) => setContent(value)}
                />
            </Grid>
            <Grid item sm={12}>
                <Paper >
                    <Container>
                        <Typography variant="h4" sx={{ paddingY: 2 }}>{opciones.find((i) => i.id === content).nombre}</Typography>
                        <RadioGroup
                            value={selected}
                            onChange={({ target: { value }}) => setSelected(parseInt(value))}
                        >
                            <List>
                                <Grid container>

                                    {
                                        lista.map((value, index) => (
                                            <Grid item sm={6}>
                                                <ListItem key={value.id} disablePadding
                                                    secondaryAction={<Radio value={value.id} />
                                                    }
                                                >
                                                    <ListItemButton
                                                        onClick={() => setSelected(value.id)}
                                                    >
                                                        <ListItemText primary={value.nombre} />
                                                    </ListItemButton>
                                                </ListItem>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </List>
                        </RadioGroup>
                    </Container>
                </Paper>
                <ProviderFormInformacion>
                    <Modal
                        title={`${!edit ? "Agregar" : "Actualizar"} ${content}`}
                        state={modalState}
                        alert={alertState.handleOpen}
                        context={contextFormInformacion}
                        confirn={!edit ? (value) => postInfo({nombre: value}) : (value) => putInfo({nombre: value}, selected)}
                    >
                        <FormInformaciones id={edit ? selected : null} content={content} />
                    </Modal>
                </ProviderFormInformacion>
                <Alerts state={alertState} />
            </Grid>
        </Grid>
    );
}