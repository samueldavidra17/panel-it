import { forwardRef, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//custom hook con los estados para el uso de las alertas,
//con el estado de si se encuentra abierto, si muestra un error o no y el mensaje a visualizar
//https://es.reactjs.org/docs/hooks-custom.html --> doc de react para crear custom hooks
export const useAlerts = () => {
    const [open, setOpen] = useState(false); //--> estado si se encuentra abierto o no
    const [error, setError] = useState(false); // --> estado si muestra un error o no
    const [message, setMessage] = useState(''); // --> mensaje a renderizar

    const handleOpen = (error, message) => {
        setError(error);
        setMessage(message);
        setOpen(true);
    };

    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return {
        open,
        message,
        error,
        handleOpen,
        handleClose
    }
}
//componente alerta que se genera en el snackbar
//https://mui.com/material-ui/react-alert/#main-content --> doc de los componentes alertas
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
//componente snackbar que renderiza la alerta
//https://mui.com/material-ui/react-snackbar/#main-content --> doc de los componentes snackbar
export default function Alerts({open, error, message, handleClose }) {
    
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={!error ? "success" : "error"} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
