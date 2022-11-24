import { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PrintIcon from '@mui/icons-material/Print';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DvrIcon from '@mui/icons-material/Dvr';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const minWidth = 40;
const paddingLeft = 4;

export default function MenuList() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 200, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
        <ListItemButton>
          <ListItemIcon sx={{minWidth}}>
            <PersonalVideoIcon />
          </ListItemIcon>
          <ListItemText primary="Equipos" />
        </ListItemButton>
      <ListItemButton>
        <ListItemIcon sx={{minWidth}}>
          <PrintIcon />
        </ListItemIcon>
        <ListItemText primary="Impresoras" />
      </ListItemButton>
      <ListItemButton onClick={handleClick} >
        <ListItemIcon sx={{minWidth}}>
          <DisplaySettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Administración" />
        {open ? <ExpandLess sx={{marginLeft: 2  }}/> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: paddingLeft }}>
              <ListItemIcon sx={{minWidth}}>
                <CorporateFareIcon />
              </ListItemIcon>
              <ListItemText primary="Organizaciones" />
            </ListItemButton>
            <ListItemButton sx={{ pl: paddingLeft }}>
              <ListItemIcon sx={{minWidth}}>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
            <ListItemButton sx={{ pl: paddingLeft }}>
              <ListItemIcon sx={{minWidth}}>
                <DvrIcon />
              </ListItemIcon>
              <ListItemText primary="Marcas" />
            </ListItemButton>
            <ListItemButton sx={{ pl: paddingLeft }}>
              <ListItemIcon sx={{minWidth}}>
                <BackupTableIcon />
              </ListItemIcon>
              <ListItemText primary="Información" />
            </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
