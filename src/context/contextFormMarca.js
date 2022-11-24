import { createContext, useReducer } from "react";
import { initialFormMarca, reducerMarca } from "reducer/reducerMarca";

export const contextFormMarcas = createContext();

export default function ProviderFormMarcasModelos({children}) {
    const [state, dispatch] = useReducer(reducerMarca, initialFormMarca);

    return (
        <contextFormMarcas.Provider value={[state, dispatch]}>
            {children}
        </contextFormMarcas.Provider>
    );
}