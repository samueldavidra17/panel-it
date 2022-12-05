import { useEffect, useState } from "react";
import {
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper, 
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import Modal, { useModal } from "component/Modal";
import Alerts, { useAlerts } from "component/Alerts";
import ProviderFormMarcas, { contextFormMarcas } from "context/contextFormMarca";
import ProviderFormModelos, { contextFormModelos } from "context/contextFormModelos";
import { FormMarcas, FormModelos } from "component/forms";
import { InputSeleccionar } from "component/inputs";
import { useRequest } from "utils/useRequest";
//componente de la pagina marcas y modelos
export function Marcas() {
    //llamado a los custom hooks para el uso de:
    //el modal (tanto para marcas como modelos) y alertas
    const modalStateMarca = useModal();
    const modalStateModelo = useModal();
    const alertState = useAlerts();
    //llamado al custom hook para la peticiones en la pagina
    //se renombra las propiedades obtenidas y estado del valor seleccionado de cada una
    //(tanto para combox de tipos de equipos, marcas y modelos)
    const {data: tiposEquipos, get: getTiposEquipos} = useRequest('tiposequipos/');
    const [seletedTipoEquipo, setSeletedTipoEquipo] = useState("");
    const {data: marcas, get: getMarcas, post: postMarca, put: putMarca} = useRequest('marcas/');
    const [seletedMarca, setSeletedMarca] = useState(0);
    const {data: modelos, get: getModelos,put: putModelo} = useRequest('modelos/');
    const [seletedModelo, setSeletedModelo] = useState(1);

    useEffect(() => {
        getTiposEquipos();
    }, []);
    //se piden las marcas en base a los tipos de equipos
    useEffect(() => {
        if(seletedTipoEquipo) 
            getMarcas({search: seletedTipoEquipo});
    }, [seletedTipoEquipo]);
    //se piden los modelos en base a las marcas y tipo de equipo
    useEffect(() => {
        if(seletedMarca > 0)
            getModelos({
                tiposEquiposMarcas_id__tiposEquipos_id: seletedTipoEquipo,
                tiposEquiposMarcas_id__marcas_id: seletedMarca
            });
    }, [seletedMarca]);
    // https://mui.com/material-ui/react-radio-button/ --> doc de componente RadioGroup
    return (
        <>
            <Grid
                container
                columnSpacing={3}
                rowSpacing={3}
            >
                <Grid item sm={6}>
                    <Button
                        variant="outlined"
                        sx={{ marginRight: 2 }}
                        onClick={modalStateMarca.handleContent}
                    >
                        Agregar
                    </Button>
                </Grid>
                <Grid item sm={6}>
                    <InputSeleccionar
                        input={seletedTipoEquipo}
                        label="Tipos Equipos"
                        opciones={tiposEquipos}
                        accion={(value) => setSeletedTipoEquipo(value)}
                    />
                </Grid>
                <Grid item sm={6}>
                    <Paper>
                        <Container>
                            <Typography variant="h4" sx={{ paddingY: 2 }}>Marca</Typography>
                            <Divider>
                                <Button
                                    variant="outlined"
                                    onClick={modalStateMarca.handleContent}
                                >
                                    Actualizar
                                </Button>
                            </Divider>
                            <RadioGroup
                                value={seletedMarca}
                                onChange={({target: {value}}) => setSeletedMarca(parseInt(value))}
                            >
                                <List>
                                    <Grid container>
                                        {
                                            marcas.map((marca, index) => (
                                                <Grid item sm={6}>
                                                    <ListItem key={marca.id} disablePadding
                                                        secondaryAction={<Radio value={marca.id} />
                                                        }
                                                    >
                                                        <ListItemButton
                                                            onClick={() => setSeletedMarca(marca.id)}
                                                        >
                                                            <ListItemText primary={marca.nombre} />
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
                <Grid item sm={6}>
                    <Paper>
                        <Container>
                            <Typography variant="h4" sx={{ paddingY: 2 }}>Modelos</Typography>
                            <Divider>
                                <Button
                                    variant="outlined"
                                    onClick={modalStateModelo.handleOpen}
                                >
                                    Actualizar
                                </Button>
                            </Divider>
                            <RadioGroup
                                value={seletedModelo}
                                onChange={({target: {value}}) => setSeletedModelo(parseInt(value))}
                            >
                                <List>
                                    <Grid container>
                                        {
                                            modelos.map((modelo) => (
                                                <Grid item sm={6}>
                                                    <ListItem key={modelo.id} disablePadding
                                                        secondaryAction={<Radio value={modelo.id} />
                                                        }
                                                    >
                                                        <ListItemButton
                                                            onClick={() => setSeletedModelo(modelo.id)}
                                                        >
                                                            <ListItemText primary={modelo.nombre} />
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
            </Grid>
            <ProviderFormMarcas>
                <Modal
                    title={"marca"}
                    {...modalStateMarca}
                    alert={alertState.handleOpen}
                    context={contextFormMarcas}
                    confirn={
                        modalStateMarca.content.toUpperCase() === "AGREGAR" 
                            ? (marca) => postMarca(marca)
                            : (marca) => putMarca(marca, seletedMarca)
                    }
                >
                    <FormMarcas 
                        tipoEquipos={seletedTipoEquipo}
                        id={
                            modalStateMarca.content.toUpperCase() !== "AGREGAR" 
                                ? seletedMarca
                                : null
                        } 
                    />
                </Modal>
            </ProviderFormMarcas>
            <ProviderFormModelos>
                <Modal
                    title={"modelo"}
                    {...modalStateModelo}
                    context={contextFormModelos}
                    confirn={putModelo}
                >
                    <FormModelos id={seletedModelo} />
                </Modal>
            </ProviderFormModelos>
            <Alerts state={alertState} />
        </>
    );
}