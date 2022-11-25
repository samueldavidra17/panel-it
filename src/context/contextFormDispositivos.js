import { createContext, useReducer } from "react";
import { initialFormDispositivos, reducerDispositivo } from "reducer/reducerDispositivo";

export const contextFormDispositivos = createContext();

export default function ProviderFormDispositivos({children}) {
    const [state, dispatch] = useReducer(reducerDispositivo, initialFormDispositivos);

    return (
        <contextFormDispositivos.Provider value={[state, dispatch]}>
            {children}
        </contextFormDispositivos.Provider>
    );
}