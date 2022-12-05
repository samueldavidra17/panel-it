import { useContext, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { clearState } from 'reducer/reducerForm';
//custom hook para funcionamiento de modal
//con el estado de si se el modal se encuentra abierto y el contenido que este va mostrar (titulo)
//https://es.reactjs.org/docs/hooks-custom.html --> doc de react para crear custom hooks
export const useModal = () => {
  const [open, setOpen] = useState(false); // --> estado para saber si se encuentra abierto o no 
  const [content, setContent] = useState(''); // --> estado del contenido del modal

  const handleOpen = () => setOpen(!open);

  const handleContent = ({ target }) => {
    setContent(target.textContent);
    handleOpen();
  }

  return { open, handleOpen, content, handleContent }
}
//componente modal que recibe un componente a renderizar dentro, el contexto del estado donde se abre  y
// una funcion a realizar para confirmar como tambien el handle de las alertas
export default function Modal({ children, title, confirn, open, handleOpen, context, content, alert }) {
  //https://reactjs.org/docs/context.html --> doc de react sobre los context
  const [state, dispatch] = useContext(context); // --> contexto del estado en que se abre
  
  const handleClose = () => {
    dispatch(clearState());
    handleOpen();
  }

  const handleConfirn = async () => {
    const {error, message} = await confirn(state);
    alert(error, message);
    if(!error) handleClose();
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{
        '& .MuiDialogContent-root': {
          padding: (theme) => theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
          padding: (theme) => theme.spacing(1),
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {content+" "+title} {/*titulo de la pagina donde se abre (se recibe por la props)*/}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {/*componente hijo que se renderiza*/}
        {children}
      </DialogContent>
      <DialogActions>
        {
          /*si se recibe una accion de confirmar se renderiza un boton para cancelar 
          sino, el boton de confirmar hace esta accion*/
          confirn ?
            <Button color={'secondary'} onClick={handleClose}>
              Cancelar
            </Button>
            :
            null
        }
        <Button autoFocus onClick={confirn ? handleConfirn : handleClose}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
