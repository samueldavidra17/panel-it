import { createContext, useReducer } from "react";
import { initialFormImpresoras, reducerImpresora } from "reducer/reducerImpresora";

export const contextFormImpresoras = createContext();

export default function ProviderFormImpresoras({children}) {
    const [state, dispatch] = useReducer(reducerImpresora, initialFormImpresoras);

    return (
        <contextFormImpresoras.Provider value={[state, dispatch]}>
            {children}
        </contextFormImpresoras.Provider>
    );
}