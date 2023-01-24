import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { useState, useRef} from 'react';
import NotaEntrega from 'component/PDF/NotaEntrega';
import { Button, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useRequest } from 'utils/useRequest';

const listApp = [
    '7Zip, Winrar',
    'Teamviewer, AnyDesk',
    'Microsoft Office 2019',
    'Mozilla Firefox, Chrome',
    'Antivirus ESET',
    'SAP GUI'
]

export function Pdf() {
    //id del equipo por parametro de la url
    const { id } = useParams();
    //estados del pdf:
    //Equipo a generar la nota de entrega
    const [equipo, setEquipo] = useState([]);
    //Lista de apps para agregar
    const [apps, setApps] = useState(listApp);
    //Texto condicional al asignar el equipo
    const [textConditional, setTextConditional] = useState(null);
    //observacion adicional 
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
    const getPdf = () => (<NotaEntrega {...{apps, textConditional, note, equipo}} />)
    
    const { getOne } = useRequest('equipos/')
    const getEquipo = async () => {
        try {
            const equipo = await getOne(id);
            setEquipo(equipo);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getEquipo();
    },[id])

    const title = `Nota de entrega - ${equipo.nombre} - ${equipo.tipo_equipo} - ${equipo.marca} ${equipo.modelo} - ${equipo.usuario}-${equipo.usuario_cargo}.pdf`;

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
                            <PDFDownloadLink document={getPdf()} fileName={title}>
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
                <PDFViewer showToolbar={false} width={825} height={1000}>
                    {getPdf()}
                </PDFViewer>
            </Grid>
        </ Grid>
    )
}

