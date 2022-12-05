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
import { InputSeleccionar } from "component/inputs";
import { useModal } from "component/Modal";
import { FormOtros } from 'component/forms';
import { useRequest } from "utils/useRequest";

//opciones para el combox de tipo de registro a manipular (acciones CRUD)
//nombre: valor a mostrar combo,
//id: direccion url en el back
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
//componente de la pagina de otros 
export function Otros() {
    //valor seleccionado en el combox
    const [content, setContent] = useState("asignaciones");
    //estado para actualizar o no en el formulario y el id del valor a actualizar
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(1);

    const modalState = useModal(); // llamado a custom hook para uso del modal
    //llamado al custom hook para la peticiones en la pagina
    //se renombra las propiedades obtenidas
    const { data: lista, get: getLista, post: postData, put: putData } = useRequest(content+'/'); 

    useEffect(() => {
        getLista();
    }, [content]);

    const title = opciones.find((i) => i.id === content).nombre; // se selecciona el nombre del tipo de registro a editar (titulo modal)
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
                    onClick={(e) => {
                        setEdit(false);
                        modalState.handleContent(e);
                    }}
                >
                    Agregar
                </Button>
                <Button
                    variant="outlined"
                    onClick={(e) => {
                        setEdit(true);
                        modalState.handleContent(e);
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
                        <Typography variant="h4" sx={{ paddingY: 2 }}>{title}</Typography>
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
                <FormOtros 
                    {...modalState}
                    title={title}
                    id={edit ? selected : null}
                    uri={content}
                    confirn={!edit ? postData : putData} 
                />
            </Grid>
        </Grid>
    );
}