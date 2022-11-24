import { createContext, useReducer } from "react";
import { initialFormModelo, reducerModelo } from "reducer/reducerModelo";

export const contextFormModelos = createContext();

export default function ProviderFormModelos({children}) {
    const [state, dispatch] = useReducer(reducerModelo, initialFormModelo);

    return (
        <contextFormModelos.Provider value={[state, dispatch]}>
            {children}
        </contextFormModelos.Provider>
    );
}