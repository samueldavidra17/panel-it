import { useEffect, useState } from 'react';
import axios from 'utils/axioIntance';
import { Button, Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ProviderFormImpresoras, { contextFormImpresoras } from 'context/contextFormImpresoras';
import Modal, { useModal } from 'component/Modal';
import Tabla, { useTabla } from 'component/Tabla';
import MenuApp, { useMenu } from 'component/MenuApp';
import Alerts, { useAlerts } from 'component/Alerts';
// import { FormImpresoras, FormInformacion, FormAsignarUsuarios } from 'component/forms';
import { InputTexto } from 'component/inputs';
// import InformacionImpresoras from 'component/InformacionImpresoras';
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
    // "Asignar",
    // "Detalles"
];

export function Impresoras() {

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
    const { data: impresoras, getPaginations: getImpresoras, post: postImpresoras, put: putImpresoras } = useRequest("impresoras/");
    const { put: putInformacion } = useRequest("informacion/");
    
    // const patchUsuarioEquipo = async ({ equipo: { usuarios } }) => {
    //     try {
    //         const res = await axios.patch(`impresoras/${id}/`, {usuarios});
    //         if(res.status !== 200) return { error: true, message: 'Ha ocurrido un error' };
    //         getImpresoras();
    //         return { error: false, message: 'Se ha asignado el usuario al equipo' };
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const getModalContent = () => {
    //     switch (modalState.content.toUpperCase()) {
    //         case "AGREGAR":
    //             return { 
    //                 children: <FormImpresoras />,
    //                 title: 'Agregar nuevo equipo', 
    //                 confirn: ({equipo}) => postImpresoras(equipo)
    //             }
    //         case "ACTUALIZAR":
    //             return { 
    //                 children: <FormImpresoras id={id} />,
    //                 title: 'Actualizar especificaciones del equipo', 
    //                 confirn: ({equipo}) => putImpresoras(equipo, id)
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
    //         //         children: <InformacionImpresoras id={id} />,
    //         //         title: 'Información del equipo', 
    //         //     }
    //     }
    // }


    // useEffect(() => {
    //     getImpresoras(tablaState, search);
    // }, [search, tablaState.page, tablaState.rowsPerPage]);

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
                {/* <ProviderFormImpresoras>
                    <Modal
                        state={modalState}
                        {...getModalContent()}
                        alert={alertState.handleOpen}
                        context={contextFormImpresoras}
                    />
                    <Alerts state={alertState} />
                </ProviderFormImpresoras> */}
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
                        rows={impresoras}
                        state={tablaState}
                        menu={menuState.handleAnchorEl}
                    />
                </Grid>
            </Grid>

        </>
    );
}