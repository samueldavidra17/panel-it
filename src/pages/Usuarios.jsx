import { useState } from "react";
import { Button, Grid } from "@mui/material";
import MenuApp, { useMenu } from "component/MenuApp";
import Tabla, { useTabla } from "component/Tabla";
import { useModal } from "component/Modal";
import { useEffect } from "react";
import { InputTexto } from "component/inputs";
import { FormUsuarios } from "component/forms";
import { useRequest } from "utils/useRequest";
//opciones activas en el menu
const menu = [
    "Actualizar"
]
//columnas con su relacion de la propiedad en la tabla 
//la posicion en el arreglo representa la aparicion en la tabla
const columns = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'cargo', label: 'Cargo' },
    { id: 'empresaNombre', label: 'Empresa' },
    { id: 'departamentoNombre', label: 'Departamento' },
];
//componente de la pagina usuarios
export function Usuarios() {
    //llamado a los custom hooks para el uso de:
    //la tabla, el modal y el menu
    const modalState = useModal();
    const tablaState = useTabla();
    const menuState = useMenu();

    const id = tablaState.selected; // --> id seleccionado en la tabla;
    //estado para el filtrado por busqueda
    const [search, setSearch] = useState('');
    const handlerSearch = (busqueda) => {
        tablaState.handleSelected(id)
        setSearch(busqueda);
    }
    //llamado al custom hook para la peticiones en la pagina
    //se renombra las propiedades obtenidas
    const { data: usuarios, getPaginations: getUsuarios, post: postUsuarios, put: putUsuarios } = useRequest("usuarios/");

    useEffect(() => {
        getUsuarios(tablaState, search);
    }, [search, tablaState.page, tablaState.rowsPerPage])

    return (
        <>
            <Grid
                container
                columnSpacing={3}
                rowSpacing={3}
            >
                        <Grid item >
                            <Button
                                variant="outlined"
                                onClick={modalState.handleContent}
                            >
                                Agregar
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button
                                variant="outlined"
                                disabled={!id ? true : false}
                                onClick={modalState.handleContent}
                            >
                                Actualizar
                            </Button>
                        </Grid>
                        <Grid item >
                            <InputTexto
                                label="Seach"
                                accion={handlerSearch}
                                property="search"
                            />
                        </Grid>
                        <FormUsuarios 
                            {...modalState}
                            title="Usuario"
                            id={id}
                            confirn={!id ? postUsuarios : putUsuarios } 
                        />
                    </Grid>
                <Grid item sm={12}>
                    <Tabla
                        columns={columns}
                        rows={usuarios}
                        state={tablaState}
                        menu={menuState.handleAnchorEl}
                    />
                    <MenuApp actions={menu} click={modalState.handleContent} state={menuState} />
                </Grid>
        </>
    );
}
