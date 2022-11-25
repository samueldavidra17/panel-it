import { useState } from 'react';
import axios from 'utils/axioIntance';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dispositivos, Equipos, Impresoras, Informacion, Login, Marcas, Organizaciones, Usuarios } from "pages";
import NavBar from "component/navegacion/NavBar";

const AppRoute = () => {
  const [sesion, setSesion] = useState({});
  const navigate = useNavigate();

  const getSesion = async () => {
    try {
      const res = await axios.get('/equipos', {
        headers: {
          Authorization: `Token ${sessionStorage.getItem('token')}` 
        }
      });
      if(res.status === 403) window.location.href = "http://localhost:3000/login";;
    } catch (error) { 
      console.log(error);
    }
  }

  getSesion();
  return (
    <NavBar onContextMenu={(e) => console.log(e)}>
      <Routes>
        <Route exact path="equipos" element={<Equipos />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="impresoras" element={<Impresoras />} />
        <Route exact path="dispositivos" element={<Dispositivos />} />
        <Route exact path="informacion" element={<Informacion />} />
        <Route exact path="marcas" element={<Marcas />} />
        <Route exact path="organizaciones" element={<Organizaciones />} />
        <Route exact path="usuarios" element={<Usuarios />} />
      </Routes>
    </NavBar>
  );
}

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