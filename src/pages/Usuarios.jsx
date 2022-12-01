import { useState } from "react";
import { Button, Grid } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ProviderFormUsuarios, { contextFormUsuarios } from "context/contextFormUsuarios";
import MenuApp, { useMenu } from "component/MenuApp";
import Tabla, { useTabla } from "component/Tabla";
import Modal, { useModal } from "component/Modal";
import Alerts, { useAlerts } from "component/Alerts";
import { useEffect } from "react";
import { InputTexto } from "component/inputs";
import { FormUsuarios } from "component/forms";
import { useRequest } from "utils/useRequest";

const menu = [
    "Actualizar"
]
const columns = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'cargo', label: 'Cargo' },
    { id: 'empresaNombre', label: 'Empresa' },
    { id: 'departamentoNombre', label: 'Departamento' },
];

export function Usuarios() {

    const modalState = useModal();
    const tablaState = useTabla();
    const menuState = useMenu();

    const id = tablaState.selected;

    const [search, setSearch] = useState('');
    const handlerSearch = (busqueda) => {
        tablaState.handleSelected(id)
        setSearch(busqueda);
    }
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
