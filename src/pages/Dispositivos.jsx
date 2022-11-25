import { useEffect, useState } from 'react';
import axios from 'utils/axioIntance';
import { Button, Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ProviderFormDispositivos, { contextFormDispositivos } from 'context/contextFormDispositivos';
import Modal, { useModal } from 'component/Modal';
import Tabla, { useTabla } from 'component/Tabla';
import MenuApp, { useMenu } from 'component/MenuApp';
import Alerts, { useAlerts } from 'component/Alerts';
// import { FormDispositivos, FormInformacion, FormAsignarUsuarios } from 'component/forms';
import { InputTexto } from 'component/inputs';
// import InformacionDispositivos from 'component/InformacionDispositivos';
import { useRequest } from 'utils/useRequest';


const columns = [
    { id: 'tipo_equipo', label: 'Tipo Equipo' },
    {id: 'marca', label: 'Marca' },
    { id: 'modelo', label: 'Modelo' },
    { id: 'serial', label: 'Serial' },
    { id: 'usuario', label: 'Usuario Asignado' },
    { id: 'departamento', label: 'Departamento' }
];
const menu = [
    "Actualizar",
    "Estado",
    // "Asignar",
    // "Detalles"
];

export function Dispositivos() {

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
    const { data: dispositivos, get: getDispositivos, post: postDispositivos, put: putDispositivos } = useRequest("dispositivos/");
    const { put: putInformacion } = useRequest("informacion/");
    
    // const patchUsuarioEquipo = async ({ equipo: { usuarios } }) => {
    //     try {
    //         const res = await axios.patch(`dispositivos/${id}/`, {usuarios});
    //         if(res.status !== 200) return { error: true, message: 'Ha ocurrido un error' };
    //         getDispositivos();
    //         return { error: false, message: 'Se ha asignado el usuario al equipo' };
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const getModalContent = () => {
    //     switch (modalState.content.toUpperCase()) {
    //         case "AGREGAR":
    //             return { 
    //                 children: <FormDispositivos />,
    //                 title: 'Agregar nuevo equipo', 
    //                 confirn: ({equipo}) => postDispositivos(equipo)
    //             }
    //         case "ACTUALIZAR":
    //             return { 
    //                 children: <FormDispositivos id={id} />,
    //                 title: 'Actualizar especificaciones del equipo', 
    //                 confirn: ({equipo}) => putDispositivos(equipo, id)
    //             }
    //         case "ESTADO":
    //             return { 
    //                 children: <FormInformacion id={id} />,
    //                 title: 'Actualizar estado del equipo', 
    //                 confirn: ({informacion}) => putInformacion(informacion, id)
    //             }
    //         // case "ASIGNAR":
    //         //     return { 
    //         //         children: <FormAsignarUsuarios id={id} />,
    //         //         title: 'Asignar usuario', 
    //         //         confirn: patchUsuarioEquipo
    //         //     }
    //         // case "DETALLES":
    //         //     return { 
    //         //         children: <InformacionDispositivos id={id} />,
    //         //         title: 'Información del equipo', 
    //         //     }
    //     }
    // }


    useEffect(() => {
        getDispositivos();
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
                {/* <ProviderFormDispositivos>
                    <Modal
                        state={modalState}
                        {...getModalContent()}
                        alert={alertState.handleOpen}
                        context={contextFormDispositivos}
                    />
                    <Alerts state={alertState} />
                </ProviderFormDispositivos> */}
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
                        rows={dispositivos}
                        state={tablaState}
                        menu={menuState.handleAnchorEl}
                    />
                </Grid>
            </Grid>

        </>
    );
}