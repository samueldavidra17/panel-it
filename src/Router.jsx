import axios from 'utils/axioIntance';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "component/navegacion/NavBar";
import { 
  Dispositivos, 
  Equipos, 
  Impresoras, 
  Otros, Login, 
  Marcas, 
  Organizaciones, 
  TiposEquipos, 
  Usuarios, 
  Pdf} from "pages";
//rutas del renderizado de los componentes del panel
//https://reactrouter.com/en/main --> doc de reac-router-dom para el manejo de las rutas
const AppRoute = () => {
  //peticion al back si se encuentra una sesion activa
  const getSesion = async () => {
    try {
      const res = await axios.get('/', {
        withCredentials: false
      });
      if(res.status === 403) window.location.href = process.env.REACT_APP_BASE_URL+"login";;
    } catch (error) { 
      console.log(error);
    }
  }

  getSesion();
  //rutas de la parte administrativa del panel
  return (
    <NavBar onContextMenu={(e) => console.log(e)}>
      <Routes>
        <Route exact path="equipos" element={<Equipos />} />
        <Route exact path="impresoras" element={<Impresoras />} />
        <Route exact path="dispositivos" element={<Dispositivos />} />
        <Route exact path="otros" element={<Otros />} />
        <Route exact path="marcas" element={<Marcas />} />
        <Route exact path="tiposequipos" element={<TiposEquipos />} />
        <Route exact path="organizaciones" element={<Organizaciones />} />
        <Route exact path="usuarios" element={<Usuarios />} />
        <Route exact path="equipos/nota/:id" element={<Pdf />} />
        <Route exact path="*" element={<Navigate to='equipos' />} />
      </Routes>
    </NavBar>
  );
}
//componente enrutador principal del panel
//si no hay una sesion carga el login 
export default function Router() {

  return (
    <BrowserRouter basename='/panel'>
      <Routes>
        <Route exact path="/*" element={<AppRoute />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}