import { useState } from 'react';
import {
    Collapse,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/system';
import axios from "utils/axioIntance"

//Custom hook para la manipulacion del estado de las tabla en las paginas que hacen uso de una,
//con el estado de la paginacion y la seleccion de una fila.
//https://es.reactjs.org/docs/hooks-custom.html --> doc de react para crear custom hooks
export const useTabla = () => {
    const [page, setPage] = useState(0); // --> pagina de la tabla
    const [rowsPerPage, setRowsPerPage] = useState(10); // --> cantidad de registros en una pagina
    const [count, setCount] = useState(0); // --> cantidad total de registros
    const [selected, setSelected] = useState(null); // --> id de la fila seleccionada

    const handleCount = (lenght) => setCount(lenght);
    
    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSelected = (id) => setSelected(selected != id ? id : null);

    const clear = () => {
        setPage(0);
        setRowsPerPage(10);
    }

    return {
        page,
        rowsPerPage,
        count,
        selected,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSelected,
        handleCount,
        clear
    }
}

//componente fila de las tablas, puede tener la capacidad de generar una tabla history
//https://mui.com/material-ui/react-table/#collapsible-table --> collapsive table
const Row = ({ columns, row, selected, handleSelected, menu, history }) => {

    const [open, setOpen] = useState(false);
    const [historyList, setHistoryList] = useState([]);

    const getHistory = async (id) => {
        try {
            const history = await axios.get(`historialequipos/${id}/`);
            setHistoryList(history.data.historial);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}
                selected={selected === row.id ? true : false}
                onClick={(e) => handleSelected(row.id)}
                onContextMenu={(e) => {
                    if (selected !== row.id) {
                        handleSelected(row.id);
                    }
                    menu(e);
                }}>
                {
                    history
                        ? <TableCell>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => {
                                    getHistory(row.id);
                                    setOpen(!open);
                                }}
                            >
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        : null
                }
                {
                    columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell
                                key={column.id}
                                style={{ maxWidth: 115, whiteSpace: "normal", wordWrap: "break-word" }}>
                                {value}
                            </TableCell>
                        );
                    })
                }
            </TableRow>
            {
                history && open
                    ?
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{ margin: 1 }}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        Historial
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                {/* aqui van los headers */}
                                                <TableCell>Fecha</TableCell>
                                                <TableCell>Usuario</TableCell>
                                                <TableCell>Cargo</TableCell>
                                                <TableCell>Departamento</TableCell>
                                                <TableCell>Observación</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/*  aqui las filas*/
                                                historyList.map((historyRow) => (
                                                    <TableRow key={historyRow.fecha}>
                                                        <TableCell>{new Date(Date.parse(historyRow.fecha)).toLocaleDateString('en-US')}</TableCell>
                                                        <TableCell>{historyRow.usuario}</TableCell>
                                                        <TableCell>{historyRow.cargo}</TableCell>
                                                        <TableCell>{historyRow.departamento}</TableCell>
                                                        <TableCell>{historyRow.observacion}</TableCell>
                                                    </TableRow>
                                                )) 
                                            }
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                    : null
            }
        </>
    );
}

//componente tabla con la capacidad de generar sus columnas y filas a partir de un json
//https://mui.com/material-ui/react-table/#sticky-header --> sticky hearders table
export default function Tabla({ columns, rows, state, menu, history }) {

    const { selected, handleSelected } = state;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 420 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {history ? <TableCell /> : null}
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{ minWidth: 115 }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .map((row) => {
                                return (
                                    <Row
                                        columns={columns}
                                        row={row}
                                        selected={selected}
                                        handleSelected={handleSelected}
                                        menu={menu}
                                        history={history}
                                    />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={state.count}
                rowsPerPage={state.rowsPerPage}
                page={state.page}
                onPageChange={state.handleChangePage}
                onRowsPerPageChange={state.handleChangeRowsPerPage}
            />
        </Paper>
    );
}
