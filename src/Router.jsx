import { useState } from 'react';
import axios from 'utils/axioIntance';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dispositivos, Equipos, Impresoras, Otros, Login, Marcas, Organizaciones, TiposEquipos, Usuarios } from "pages";
import NavBar from "component/navegacion/NavBar";
//rutas del renderizado de los componentes del panel
//https://reactrouter.com/en/main --> doc de reac-router-dom para el manejo de las rutas
const AppRoute = () => {
  const [sesion, setSesion] = useState({});
  const navigate = useNavigate();
  //peticion al back si se encuentra una sesion activa
  const getSesion = async () => {
    try {
      const res = await axios.get('equipos', {
        withCredentials: false
      });
      if(res.status === 403) window.location.href = "http://172.17.245.162:3000/login";;
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
      </Routes>
    </NavBar>
  );
}
//componente enrutador principal del panel
//si no hay una sesion carga el login 
export default function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<AppRoute />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}