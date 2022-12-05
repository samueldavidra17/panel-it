import { useEffect, useState } from "react";
import {
    Button,
    Checkbox,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper, Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import Modal, { useModal } from "component/Modal";
import Alerts, { useAlerts } from "component/Alerts";
import ProviderFormEmpresasDepartamentos, { contextFormEmpresasDepartamentos } from "context/contextFormEmpresasDepartamentos";
import { FormEmpresasDepartamentos } from "component/forms";
import { InputSeleccionar } from "component/inputs";
import { useRequest } from "utils/useRequest";
//componente de la pagina de organizaciones (departamentos y empresas)
export function Organizaciones() {
    //llamado a los custom hooks para el uso de:
    //el modal y las alertas
    const modalState = useModal();
    const alertState = useAlerts();

    const [selected, setSelected] = useState(1); // --> estado del id seleccionado (tanto empresas como departamentos)

    const handleChange = (event) => setSelected(parseInt(event.target.value));
    //llamado al custom hook para la peticiones en la pagina
    //se renombra las propiedades obtenidas (tanto empresas como departamentos)
    const { data: empresas, set: setEmpresas, get: getEmpresas, post: postEmpresa, put: putEmpresa } = useRequest("empresas/");
    const { data: departamentos, set: setDepartamentos, get: getDepartamentos, post: postDepartamento, put: putDepartamento } = useRequest("departamentos/");
    //funcion para actualizar las relaciones entre departamentos y empreas
    const handleSelected = (id) => {
        //filtra en el arreglo con los id respectivos de cada organizacion
        const { organizacion, setOrganizaciones } = 
                content.toUpperCase() === 'EMPRESAS' 
                ? {organizacion: empresas, setOrganizaciones: setEmpresas} 
                : {organizacion: departamentos, setOrganizaciones: setDepartamentos}

        const value = organizacion.find((i) => i.id === selected);
        const indexValue = organizacion.indexOf(value);
        const keys = Object.keys(value);
        //si se encuentra se remueve el id del arreglo
        if(value[keys[2]].includes(id)){
            const indexReplace = value[keys[2]].indexOf(id);
            value[keys[2]].splice(indexReplace, 1)
        }else{
        // si no se encuentra se agrega el id
            value[keys[2]].push(id);
        }
        organizacion.splice(indexValue, 1, value);
        setOrganizaciones([...organizacion]); // por ultimo se renueva el renderizado del estado
    }
    //estado para saber si se manipulan las empresas o los departamentos
    const [content, setContent] = useState("");
    const handleContent = (value) => {
        setContent(value)
        modalState.handleOpen();
    }
    //estado para saber si se va a actualilzar o agregar
    const [edit, setEdit] = useState(false);
    //funcion para devolver formulario para empresas o departamentos
    const getActionModal = () => {
        switch(content.toUpperCase()){
            case "EMPRESAS":
                return {
                    title: !edit ? "Agregar nueva empresa" : "Actualizar empresa",
                    confirn: !edit ? ({empresa}) => postEmpresa(empresa) : ({empresa}) => putEmpresa(empresa, selected)
                }
            case "DEPARTAMENTOS":
                return {
                    title: !edit ? "Agregar nueva departamento" : "Actualizar departamento",
                    confirn: !edit ? ({departamento}) => postDepartamento(departamento) : ({departamento}) => putDepartamento(departamento, selected)
                }
        }
    }
    useEffect(() => {
        getEmpresas();
        getDepartamentos();
    }, []);

    return (
        <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={selected}
            onChange={handleChange}
        >
            <Grid
                container
                columnSpacing={3}
                rowSpacing={3}
            >
                <Grid item sm={6}>
                    <Button
                        disabled={content === ""}
                        variant="outlined"
                        sx={{marginRight: 2}}
                        onClick={() => setEdit(!edit)}
                    >
                        {!edit ? "Editar" : "Cancelar"}
                    </Button>
                    {
                        edit 
                            ? <Button 
                                variant="outlined"
                                //funcion para actualizar relacion entre empresas
                                onClick={async () => {
                                    const { error , message } = 
                                    content.toUpperCase() === "EMPRESAS" 
                                                    ? await putEmpresa(empresas.find((i) => i.id === selected), selected) 
                                                    : await putDepartamento(departamentos.find((i) => i.id === selected), selected)
                                    alertState.handleOpen(error, message);
                            }}>
                                Actualizar Relación
                              </Button>
                            : null
                    }
                </Grid>
                <Grid item sm={6}>
                    <InputSeleccionar
                        input={content}
                        label="Organizacion"
                        opciones={["Empresas", "Departamentos"]}
                        accion={(value) => {
                            setContent(value);
                            setEdit(false)
                        }}
                    />
                </Grid>
                <Grid item sm={6}>
                    <Paper>
                        <Container>
                            <Typography variant="h4" sx={{ paddingY: 2 }}>Empresas</Typography>
                            <Divider>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleContent("Empresas")}
                                >
                                    {!edit || content !== "Empresas" ? "Agregar" : "Actualizar"}
                                </Button>
                            </Divider>
                            <List>
                                {
                                    empresas.map((empresa, index) => (
                                        <ListItem key={empresa.id} disablePadding
                                            secondaryAction={
                                                edit ?
                                                    content !== "Empresas"
                                                        ? <Checkbox
                                                            checked={departamentos.find((i) => i.id === selected).empresas.includes(empresa.id)}
                                                            value={empresa.id}
                                                            onClick={() => handleSelected(empresa.id)}
                                                            edge="end"
                                                        />
                                                        : <Radio value={empresa.id} />
                                                    :
                                                    null
                                            }
                                        >
                                            <ListItemButton
                                                onClick={() => content === "Empresas" ? setSelected(empresa.id) : handleSelected(empresa.id)}
                                            >
                                                <ListItemText primary={empresa.nombre} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))
                                }

                            </List>
                        </Container>
                    </Paper>
                </Grid>
                <Grid item sm={6}>
                    <Paper>
                        <Container>
                            <Typography variant="h4" sx={{ paddingY: 2 }}>Departamentos</Typography>
                            <Divider>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleContent("Departamentos")}
                                >
                                    {!edit || content !== "Departamentos" ? "Agregar" : "Actualizar"}
                                </Button>
                            </Divider>
                            <List>
                                {
                                    departamentos.map((departamento, index) => {
                                        const labelId = `checkbox-list-secondary-label-${departamento.nombre}`;
                                        return (
                                            <ListItem
                                                key={departamento.id}
                                                disablePadding
                                                secondaryAction={
                                                    edit
                                                        ?
                                                        content !== "Departamentos"
                                                            ? <Checkbox
                                                                checked={empresas.find((i) => i.id === selected).empresasDepartamentos.includes(departamento.id)}
                                                                value={departamento.id}
                                                                onClick={() => handleSelected(departamento.id)}
                                                                edge="end"
                                                            />
                                                            : <Radio value={departamento.id} />
                                                        :
                                                        null
                                                }
                                            >
                                                <ListItemButton
                                                    onClick={() => content === "Departamentos" ? setSelected(departamento.id) : handleSelected(departamento.id)}
                                                >
                                                    <ListItemText id={labelId} primary={departamento.nombre} />
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Container>
                    </Paper>
                </Grid>
            </Grid>
            <ProviderFormEmpresasDepartamentos>
                    <Modal
                        {...getActionModal()}
                        {...modalState}
                        alert={alertState.handleOpen}
                        context={contextFormEmpresasDepartamentos}
                    >
                        <FormEmpresasDepartamentos title={content} id={edit ? selected : null} />
                    </Modal>
                </ProviderFormEmpresasDepartamentos>
                <Alerts state={alertState} />
        </RadioGroup>
    );
}