import { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, Icon } from '@mui/material';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PrintIcon from '@mui/icons-material/Print';
import MouseIcon from '@mui/icons-material/Mouse';
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
        <ListItemButton component={Link} to="/">
          <ListItemIcon sx={{minWidth}}>
            <PersonalVideoIcon />
          </ListItemIcon>
          <ListItemText primary="Equipos" />
        </ListItemButton>
      <ListItemButton component={Link} to="/impresoras">
        <ListItemIcon sx={{minWidth}}>
          <PrintIcon />
        </ListItemIcon>
        <ListItemText primary="Impresoras" />
      </ListItemButton>
      <ListItemButton component={Link} to="/dispositivos">
        <ListItemIcon sx={{minWidth}}>
          <MouseIcon />
        </ListItemIcon>
        <ListItemText primary="Dispositivos" />
      </ListItemButton>
      <ListItemButton component={Link} to="/glpi">
        <ListItemIcon sx={{ minWidth }}>
          <Icon>
            <img src={"./glpi.png"} height={25} width={25} />
          </Icon>
        </ListItemIcon>
        <ListItemText primary="GLPI" />
      </ListItemButton>
      <ListItemButton onClick={handleClick} >
        <ListItemIcon sx={{minWidth}}>
          <DisplaySettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Administración" sx={{marginRight: 15 }}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: paddingLeft }} component={Link} to="/organizaciones">
              <ListItemIcon sx={{minWidth}}>
                <CorporateFareIcon />
              </ListItemIcon>
              <ListItemText primary="Organizaciones" />
            </ListItemButton>
            <ListItemButton sx={{ pl: paddingLeft }} component={Link} to="/usuarios">
              <ListItemIcon sx={{minWidth}}>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
            <ListItemButton sx={{ pl: paddingLeft }} component={Link} to="/marcas">
              <ListItemIcon sx={{minWidth}}>
                <DvrIcon />
              </ListItemIcon>
              <ListItemText primary="Marcas" />
            </ListItemButton>
            <ListItemButton sx={{ pl: paddingLeft }} component={Link} to="/informacion">
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
