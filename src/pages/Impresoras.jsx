import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useModal } from 'component/Modal';
import Tabla, { useTabla } from 'component/Tabla';
import MenuApp, { useMenu } from 'component/MenuApp';
import { FormImpresoras, FormEstado } from 'component/forms';
import { InputTexto } from 'component/inputs';
import { useRequest } from 'utils/useRequest';
//columnas con su relacion de la propiedad en la tabla 
//la posicion en el arreglo representa la aparicion en la tabla
const columns = [
    { id: 'tipo_impresora', label: 'Tipo Impresora' },
    { id: 'marca', label: 'Marca' },
    { id: 'modelo', label: 'Modelo' },
    { id: 'serial', label: 'Serial' },
    { id: 'csb', label: 'CSB' },
    { id: 'tipo_conexion', label: 'Tipo conexión' },
    { id: 'ip', label: 'IP' },
    { id: 'departamento', label: 'Departamento' },
    { id: 'ubicacion', label: 'Ubicacion' },
    {id: 'toner', label: 'Toner' },
    {id: 'estatus', label: 'Estatus' },
];
//opciones activas en el menu
const menu = [
    "Actualizar",
    // "Asignar",
    // "Detalles"
];
//componente de la pagina impresoras
export function Impresoras() {
    //llamado a los custom hooks para el uso de:
    //la tabla, el modal y el menu
    const tablaState = useTabla();
    const modalState = useModal();
    const menuState = useMenu();

    const id = tablaState.selected; // --> id seleccionado en la tabla
    //estado para el filtrado por busqueda
    const [search, setSearch] = useState('');
    const handlerSearch = (busqueda) => {
        tablaState.handleSelected(id)
        setSearch(busqueda);
    }
    //llamado al custom hook para la peticiones en la pagina
    //se renombra las propiedades obtenidas
    const { data: impresoras, get: getImpresoras, post: postImpresoras, put: putImpresoras } = useRequest("impresoras/");
    const { put: putInformacion } = useRequest("informacion/");

    useEffect(() => {
        getImpresoras();
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
                <FormImpresoras
                    {...modalState}
                    title={"Impresora"}
                    id={id}
                    confirn={!id ? postImpresoras : putImpresoras} 
                />
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