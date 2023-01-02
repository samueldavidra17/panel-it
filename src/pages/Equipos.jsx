import { useEffect, useState } from 'react';
import axios from 'utils/axioIntance';
import { Button, Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useModal } from 'component/Modal';
import Tabla, { useTabla } from 'component/Tabla';
import MenuApp, { useMenu } from 'component/MenuApp';
import { FormEquipos, FormInformacion, FormAsignarUsuarios } from 'component/forms';
import { InputTexto } from 'component/inputs';
import InformacionEquipos from 'component/InformacionEquipos';
import { useRequest } from 'utils/useRequest';
import { useNavigate } from 'react-router-dom';
//columnas con su relacion de la propiedad en la tabla 
//la posicion en el arreglo representa la aparicion en la tabla
const columns = [
    { id: 'usuario_so', label: 'Nombre Equipo' },
    { id: 'usuario', label: 'Usuario Responsable' },
    { id: 'ubicacion', label: 'Ubicación' },
    { id: 'departamento', label: 'Departamento' },
    { id: 'serial', label: 'Serial' },
    { id: 'csb', label: 'CSB' },
    { id: 'tipo_equipo', label: 'Tipo Equipo' },
    { id: 'modelo', label: 'Modelo' },
    { id: 'marca', label: 'Marca' }
];
//opciones activas en el menu
const menu = [
    "Actualizar",
    "Estado",
    "Asignar",
    "Detalles"
];
//componente de la pagina equipos
export function Equipos() {
    const navigate = useNavigate();
    //llamado a los custom hooks para el uso de:
    //la tabla, el modal y el menu
    const tablaState = useTabla();
    const modalState = useModal();
    const menuState = useMenu();

    const id = tablaState.selected; // --> id seleccionado en la tabla
    //estado para el filtrado por busqueda
    const [search, setSearch] = useState('');
    const handlerSearch = (busqueda) => {
        tablaState.clear();
        setSearch(busqueda);
    }
    //llamado al custom hook para la peticiones en la pagina
    //se renombra las propiedades obtenidas
    const { data: equipos, getPaginations: getEquipos, post: postEquipos, put: putEquipos } = useRequest("equipos/");
    const { put: putInformacion } = useRequest("informacion/");
    //peticion patch para la asignacion de un usuario
    const patchUsuarioEquipo = async ({ usuarios }) => {
        try {
            const res = await axios.patch(`equipos/${id}/`, { usuarios });
            if (res.status !== 200) return { error: true, message: 'Ha ocurrido un error' };
            getEquipos();
            return { error: false, message: 'Se ha asignado el usuario al equipo' };
        } catch (error) {
            console.log(error);
        }
    }
    //funcion que devuelve un formulario dependiendo de la accion
    //hecha en los botones de la pagina
    const getModalContent = () => {
        switch (modalState.content.toUpperCase()) {
            case "AGREGAR":
                return <FormEquipos
                    {...modalState}
                    title='Equipo'
                    confirn={postEquipos}
                />
            case "ACTUALIZAR":
                return <FormEquipos
                    {...modalState}
                    title='Equipo'
                    id={id}
                    confirn={(state) => putEquipos({ ...state, modelos: state.modelo_id })}
                />
            case "ESTADO":
                return <FormInformacion
                    {...modalState}
                    title="Equipo"
                    id={id}
                    confirn={putInformacion}
                />
            case "ASIGNAR":
                return <FormAsignarUsuarios
                    {...modalState}
                    title="Usuario"
                    confirn={patchUsuarioEquipo}
                    redirect={() =>  navigate(`nota/${id}`)}
                />
            case "DETALLES":
                return <InformacionEquipos {...modalState} id={id} title="Equipo"/>
        }
    }


    useEffect(() => {
        getEquipos(tablaState, search);
    }, [search, tablaState.page, tablaState.rowsPerPage]);

    return (
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
            {/* Formulario */}
            {getModalContent()}
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
    );
}