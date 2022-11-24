import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAnchorEl = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    open,
    handleAnchorEl,
    handleClose
  }
}

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
