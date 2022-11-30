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
export const useModal = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  const handleOpen = () => setOpen(!open);

  const handleContent = ({ target }) => {
    setContent(target.textContent);
    handleOpen();
  }

  return { open, handleOpen, content, handleContent }
}

export default function Modal({ children, title, confirn, open, handleOpen, context, content }) {
  const [state, dispatch] = useContext(context);
  
  const handleClose = () => {
    dispatch(clearState());
    handleOpen();
  }

  const handleConfirn = async () => {
    if(await confirn(state)) handleClose()
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
        {content+" "+title}
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
        {children}
      </DialogContent>
      <DialogActions>
        {
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
