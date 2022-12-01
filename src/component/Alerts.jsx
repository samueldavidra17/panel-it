import { forwardRef, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const useAlerts = () => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

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

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Alerts({open, error, message, handleClose }) {
    
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={!error ? "success" : "error"} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
