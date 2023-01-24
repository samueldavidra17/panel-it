import { Grid, List, ListItem, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import axios from 'utils/axioIntance';
import { contextForm } from 'context/contextForm';
import { setState } from 'reducer/reducerForm';
import { useContext, useEffect } from 'react';
import withModal from 'utils/withModal';
//componente de informacion detallada del equipo seleccionado
function InformacionEquipos({ id }) {
    const [state, dispatch] = useContext(contextForm);

    const getEquipo = async () => {
        try {
            const res = await axios.get(`equipos/${id}/`);
            dispatch(setState(res.data));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getEquipo()
    }, []);

    return (
        <Container>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Usario Responsable: {state.usuario}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Datos del equipo:
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <List disablePadding>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={state.tipo_equipo} secondary="Tipo Equipo" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={state.serial} secondary="Serial" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={state.csb} secondary="CSB" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={state.so_nombre} secondary="Sistema Operativo" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <List disablePadding>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={state.marca} secondary="Marca" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary= {state.serial_cargador} secondary="Serial Cargador" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={state.dd} secondary="Disco Duro" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={state.nombre} secondary="Nombre Equipo" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <List disablePadding>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={state.modelo} secondary="Modelo" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={state.serial_unidad} secondary="Serial Unidad" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={state.ram} secondary="RAM" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={state.tipo_ram_nombre} secondary="Tipo RAM" />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Estado del equipo:
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={state?.informacion?.estatus} secondary="Estatus" />
                    </ListItem>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={state?.informacion?.asignacion} secondary="Asignación" />
                    </ListItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={state?.informacion?.ubicacion} secondary="Ubicación" />
                    </ListItem>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={state?.informacion?.observacion} secondary="Observación" />
                    </ListItem>
                </Grid>
            </Grid>
        </Container>
    );
}

export default withModal(InformacionEquipos);