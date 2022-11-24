import { Grid, List, ListItem, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import axios from 'utils/axioIntance';
import { contextFormEquipos } from 'context/contextFormEquipos';
import { useContext, useEffect } from 'react';
import { setEquipo, setInformacion } from 'reducer/reducerEquipo';

export default function InformacionEquipos({ id }) {
    const [state, dispatch] = useContext(contextFormEquipos);
    const { equipo, informacion } = state;

    const getEquipo = async () => {
        try {
            const res = await axios.get(`equipos/${id}`);
            const equipo = { ...res.data }
            const informacion = { ...res.data.informacion }
            dispatch(setEquipo(equipo));
            dispatch(setInformacion(informacion));
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
                Usario Responsable: {equipo.usuario}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Datos del equipo:
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <List disablePadding>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={equipo.tipo_equipo} secondary="Tipo Equipo" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={equipo.serial} secondary="Serial" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={equipo.csb} secondary="CSB" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={equipo.so} secondary="Sistema Operativo" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <List disablePadding>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={equipo.marca} secondary="Marca" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary= {equipo.serial_cargador} secondary="Serial Cargador" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={equipo.dd} secondary="Disco Duro" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={equipo.usuario_so} secondary="Usuario Windows" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <List disablePadding>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={equipo.modelos} secondary="Modelo" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={equipo.serial_unidad} secondary="Serial Unidad" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={equipo.ram} secondary="RAM" />
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={equipo.tipo_ram} secondary="Tipo RAM" />
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
                        <ListItemText primary={informacion.estatus} secondary="Estatus" />
                    </ListItem>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={informacion.asignacion} secondary="Asignación" />
                    </ListItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={informacion.ubicacion} secondary="Ubicación" />
                    </ListItem>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={informacion.observacion} secondary="Observación" />
                    </ListItem>
                </Grid>
            </Grid>
        </Container>
    );
}
