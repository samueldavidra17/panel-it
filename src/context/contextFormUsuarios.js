import { createContext, useReducer } from "react";
import { initialFormUsuarios, reducerUsuario } from "reducer/reducerUsuario";

export const contextFormUsuarios = createContext();

export default function ProviderFormUsuarios({children}) {
    const [state, dispatch] = useReducer(reducerUsuario, initialFormUsuarios);

    return (
        <contextFormUsuarios.Provider value={[state, dispatch]}>
            {children}
        </contextFormUsuarios.Provider>
    );
}