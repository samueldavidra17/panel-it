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
import { useRequest } from "utils/useRequest";
import { FormTiposEquipos } from "component/forms/FormTiposEquipos";

export function TiposEquipos() {

    const [tipo, setTipo] = useState("Equipos");
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState("");
    
    const modalState = useModal();
    const alertState = useAlerts();
    
    const { data: tiposEquipos, get: getTiposEquipos, post: postInfo, put: putInfo } = useRequest("tiposequipos/"); 

    useEffect(() => {
        getTiposEquipos({search: tipo.charAt(0)});
    }, [tipo]);

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
                    onClick={modalState.handleContent}
                >
                    Agregar
                </Button>
                <Button
                    variant="outlined"
                    onClick={modalState.handleContent}
                >
                    Actualizar
                </Button>
            </Grid>
            <Grid item sm={6}>
                <InputSeleccionar
                    input={tipo}
                    label="Tipos Equipos"
                    opciones={["Equipos", "Impresoras", "Dispositivo"]}
                    accion={(value) => setTipo(value)}
                />
            </Grid>
            <Grid item sm={12}>
                <Paper >
                    <Container>
                        <Typography variant="h4" sx={{ paddingY: 2 }}>{`Tipo de ${tipo}`}</Typography>
                        <RadioGroup
                            value={selected}
                            onChange={({ target: { value }}) => setSelected(parseInt(value))}
                        >
                            <List>
                                <Grid container>

                                    {
                                        tiposEquipos.map((value) => (
                                            <Grid item sm={6} key={value.id}>
                                                <ListItem disablePadding
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
            </Grid>
            <FormTiposEquipos 
                {...modalState}
                title={tipo}
                confirn={(value) => console.log(value)} />
        </Grid>
    );
}