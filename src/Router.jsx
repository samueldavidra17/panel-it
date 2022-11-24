import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Equipos, Informacion, Marcas, Organizaciones, Usuarios } from "pages";
import NavBar from "component/navegacion/NavBar";

  export default function Router() {
    return (
        <BrowserRouter>
          <NavBar onContextMenu={(e) =>  console.log(e)}>
            <Routes>
                <Route path="/" element={<Equipos />}/>
                <Route path="/informacion" element={<Informacion />}/>
                <Route path="/marcas" element={<Marcas />}/>
                <Route path="/organizaciones" element={<Organizaciones />}/>
                <Route path="/usuarios" element={<Usuarios />}/>
            </Routes>
          </NavBar>
        </BrowserRouter>
    );
  }