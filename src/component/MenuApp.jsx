import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
//custom hook con el estado para el manejo de los componentes menu
//con el estado la posicion donde se abre y si se encuentra o no abierto esta
////https://es.reactjs.org/docs/hooks-custom.html --> doc de react para crear custom hooks
export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null); // --> posicion donde se abre el menu
  const open = Boolean(anchorEl); // --> si hay una posicion en el estado este se habre al cerrar se vuelve null

  const handleAnchorEl = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => setAnchorEl(null);

  return {
    anchorEl,
    open,
    handleAnchorEl,
    handleClose
  }
}
//componente menu que recibe las diferentes acciones que esta realiza en sus opciones
//https://mui.com/material-ui/react-menu/#main-content --> doc de componente menu
export default function MenuApp({ actions, click, state: { open, handleClose, anchorEl} }) {

  const handleOnClick = (e) => {
    click(e);
    handleClose();
  }

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {
        actions.map((i) => (<MenuItem key={i} onClick={handleOnClick}>{i}</MenuItem>))
      }
    </Menu>
  );
}
