import { useEffect, useState } from 'react';
import axios from 'utils/axioIntance';
import { Button, Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ProviderFormEquipos, { contextFormEquipos } from 'context/contextFormEquipos';
import Modal, { useModal } from 'component/Modal';
import Tabla, { useTabla } from 'component/Tabla';
import MenuApp, { useMenu } from 'component/MenuApp';
import Alerts, { useAlerts } from 'component/Alerts';
import { FormEquipos, FormInformacion, FormAsignarUsuarios } from 'component/forms';
import { InputTexto } from 'component/inputs';
import InformacionEquipos from 'component/InformacionEquipos';
import { useRequest } from 'utils/useRequest';


const columns = [
    { id: 'usuario_so', label: 'Nombre Equipo' },
    { id: 'usuario', label: 'Usuario Responsable' },
    { id: 'ubicacion', label: 'Ubicación' },
    { id: 'departamento', label: 'Departamento' },
    { id: 'serial', label: 'Serial' },
    { id: 'csb', label: 'CSB' },
    { id: 'tipo_equipo', label: 'Tipo Equipo' },
    { id: 'modelo', label: 'Modelo' },
    {id: 'marca', label: 'Marca' }
];
const menu = [
    "Actualizar",
    "Estado",
    "Asignar",
    "Detalles"
];

export function Equipos() {

    const tablaState = useTabla();
    const modalState = useModal();
    const menuState = useMenu();
    const alertState = useAlerts();

    const id = tablaState.selected;
    
    const [search, setSearch] = useState('');
    const handlerSearch = (busqueda) => {
        tablaState.handleSelected(id)
        setSearch(busqueda);
    }
    const { data: equipos, getPaginations: getEquipos, post: postEquipos, put: putEquipos } = useRequest("equipos/");
    const { put: putInformacion } = useRequest("informacion/");
    
    const patchUsuarioEquipo = async ({ equipo: { usuarios } }) => {
        try {
            const res = await axios.patch(`equipos/${id}/`, {usuarios});
            if(res.status !== 200) return { error: true, message: 'Ha ocurrido un error' };
            getEquipos();
            return { error: false, message: 'Se ha asignado el usuario al equipo' };
        } catch (error) {
            console.log(error);
        }
    }

    const getModalContent = () => {
        switch (modalState.content.toUpperCase()) {
            case "AGREGAR":
                return { 
                    children: <FormEquipos />,
                    title: 'Agregar nuevo equipo', 
                    confirn: ({equipo}) => postEquipos(equipo)
                }
            case "ACTUALIZAR":
                return { 
                    children: <FormEquipos id={id} />,
                    title: 'Actualizar especificaciones del equipo', 
                    confirn: ({equipo}) => putEquipos(equipo, id)
                }
            case "ESTADO":
                return { 
                    children: <FormInformacion id={id} />,
                    title: 'Actualizar estado del equipo', 
                    confirn: ({informacion}) => putInformacion(informacion, id)
                }
            case "ASIGNAR":
                return { 
                    children: <FormAsignarUsuarios id={id} />,
                    title: 'Asignar usuario', 
                    confirn: patchUsuarioEquipo
                }
            case "DETALLES":
                return { 
                    children: <InformacionEquipos id={id} />,
                    title: 'Información del equipo', 
                }
        }
    }


    useEffect(() => {
        getEquipos(tablaState, search);
    }, [search, tablaState.page, tablaState.rowsPerPage]);

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                rowSpacing={3}
                columnSpacing={3}
            >
                <Grid item>
                    <Button
                        variant="outlined"
                        onClick={modalState.handleContent}
                    >
                        Agregar
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        disabled={!id ? true : false}
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={menuState.handleAnchorEl}
                    >
                        Acciones
                    </Button>
                    <MenuApp actions={menu} click={modalState.handleContent} state={menuState} />
                </Grid>
                <ProviderFormEquipos>
                    <Modal
                        state={modalState}
                        {...getModalContent()}
                        alert={alertState.handleOpen}
                        context={contextFormEquipos}
                    />
                    <Alerts state={alertState} />
                </ProviderFormEquipos>
                <Grid item>
                    <InputTexto
                        label="Seach"
                        accion={handlerSearch}
                        property="search"
                    />
                </Grid>
                <Grid item sm={12}>
                    <Tabla
                        columns={columns}
                        rows={equipos}
                        state={tablaState}
                        menu={menuState.handleAnchorEl}
                        history={true}
                    />
                </Grid>
            </Grid>

        </>
    );
}