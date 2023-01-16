import { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, Icon, Divider } from '@mui/material';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PrintIcon from '@mui/icons-material/Print';
import MouseIcon from '@mui/icons-material/Mouse';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DvrIcon from '@mui/icons-material/Dvr';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
//https://mui.com/material-ui/material-icons/ --> doc de los componentes iconos
const minWidth = 40;
const paddingLeft = 4;
//componente menu con la lista de las paginas del panel
//https://mui.com/material-ui/react-list/#nested-list --> doc del componente lista
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
      {/* item de la lista renderizado como un componente link de la libreria reac-router 
      https://reactrouter.com/en/main/components/link --> doc del componente link de reac-router*/}
        <ListItemButton component={Link} to="/equipos">
        {/* https://mui.com/material-ui/api/list-item-icon/ --> doc api LinkItemButton*/}
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
      {/* <ListItemButton component={Link} to="/glpi">
        <ListItemIcon sx={{ minWidth }}>
          <Icon>
            <img alt="glpi" src={"./glpi.png"} height={25} width={25} />
          </Icon>
        </ListItemIcon>
        <ListItemText primary="GLPI" />
      </ListItemButton> */}
      {/* <ListItemButton onClick={handleClick} >
        <ListItemIcon sx={{minWidth}}>
          <DisplaySettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Administración" sx={{marginRight: 15 }}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton> */}
      {/* <Collapse in={open} timeout="auto" unmountOnExit> */}
      <Divider variant='middle' />
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
            <ListItemButton sx={{ pl: paddingLeft }} component={Link} to="/tiposequipos">
              <ListItemIcon sx={{minWidth}}>
                <DevicesOtherIcon />
              </ListItemIcon>
              <ListItemText primary="Tipos Equipos" />
            </ListItemButton>
            <ListItemButton sx={{ pl: paddingLeft }} component={Link} to="/otros">
              <ListItemIcon sx={{minWidth}}>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Otros" />
            </ListItemButton>
        </List>
      {/* </Collapse> */}
    </List>
  );
}
