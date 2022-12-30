import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { useState, useRef} from 'react';
import NotaEntrega from 'component/PDF/NotaEntrega';
import { Button, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemText, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const title = "NOTA DE ENTREGA";

const usuario = {
    nombre: "Samuel Ramirez",
    cargo: 'Analista de Aplicaciones'
  }
  
  const equipo = {
    informacion: {
      "estatus": "INOPERATIVA",
      "asignacion": "DAÑADA",
      "observacion": "S/N",
      "ubicacion": "AGROBEL"
    },
    id: 1,
    departamento: "ADMINISTRACION",
    ubicacion: "AGROBEL",
    serial: "LKADD43",
    serial_cargador: "NO APLICA",
    serial_unidad: "NO TIENE",
    dd: "80GB",
    ram: "2GB",
    tipo_ram: "DDR",
    csb: "S/N",
    tipo_equipo: "DESKTOP",
    tipoEquipos_id: "E-2",
    antivirus: "S/N",
    usuario_so: "TTB012",
    so: "MICROSOFT WINDOWS 7",
    modelos: "8215-35S",
    modelo_id: 1,
    marca: "LENOVO",
    marca_id: 1,
    usuario: "DISPONIBLE",
    empresa_id: 1,
    historial: []
  }
  
export function Pdf() {

    const [apps, setApps] = useState([]);
    const [textConditional, setTextConditional] = useState(null);
    const [note, setNote] = useState(null);

    const appRef = useRef();
    const conditionalRef = useRef();
    const noteRef = useRef();

    const addApp = () => {
        const { value } = appRef.current;
        if(value){
            apps.push(value);
            setApps([...apps]);
            appRef.current.value = "";
        }
    }
    const getPdf = () => (<NotaEntrega {...{apps, textConditional, note, equipo, usuario}} />)
    return (
        <Grid
            container
            rowSpacing={3}
            columnSpacing={3}>
            <Grid item sm={6}>
                <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={3}>
                    <Grid item sm={12}>
                        <Button variant="outlined">
                            <PDFDownloadLink document={getPdf()} fileName={`${title}.pdf`}>
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Cargando...' : 'Descargar'
                                }
                            </PDFDownloadLink>
                        </Button>
                    </Grid>
                    <Grid item sm={12}>
                        <Grid
                            container
                            alignContent='center'
                            columnSpacing={3}
                            rowSpacing={3}
                        >
                            <Grid item sm={10}>
                                <TextField 
                                    id="outlined-basic" 
                                    inputRef={conditionalRef} 
                                    label="Condición" 
                                    variant="outlined" 
                                    sx={{width: '100%'}} 
                                />
                            </Grid>
                            <Grid item sm={2}>
                                <IconButton onClick={() => setTextConditional(conditionalRef.current.value)}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={12}>
                        <Grid
                            container
                            alignContent='center'
                            columnSpacing={3}
                            rowSpacing={3}
                        >
                            <Grid item sm={10}>
                                <TextField 
                                    id="outlined-basic" 
                                    inputRef={noteRef} 
                                    label="Observarción" 
                                    variant="outlined" 
                                    sx={{width: '100%'}} 
                                />
                            </Grid>
                            <Grid item sm={2}>
                                <IconButton onClick={() => setNote(noteRef.current.value)}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={12}>
                        <Grid
                            container
                            alignContent='center'
                            columnSpacing={3}
                            rowSpacing={3}
                        >
                            <Grid item sm={10}>
                                <TextField 
                                    id="outlined-basic" 
                                    inputRef={appRef} 
                                    label="Programa" 
                                    variant="outlined" 
                                    sx={{width: '100%'}} 
                                />
                            </Grid>
                            <Grid item sm={2}>
                                <IconButton onClick={addApp}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={12}>
                        <Grid container spacing={2}>
                            <Grid item sm={12}>
                                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                                    Lista Programas
                                </Typography>
                                <Paper style={{ height: 200, width: '100%', maxHeight: 200, overflow: 'auto'}}>
                                    <List dense={true} sx={{ paddingX: 10}}>
                                        {
                                            apps.map((app, index) =>(
                                                <ListItem 
                                                    key={index+'-'+app}
                                                    secondaryAction={
                                                        <IconButton 
                                                            edge="end" 
                                                            aria-label="delete"
                                                            onClick={() => {
                                                                apps.splice(index, 1);
                                                                setApps([...apps]);
                                                            }}  
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    }
                                                >
                                                    <ListItemText primary={app}/>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={6}>
                <PDFViewer showToolbar={false} width={850} height={1000}>
                    {getPdf()}
                </PDFViewer>
            </Grid>
        </ Grid>
    )
}

