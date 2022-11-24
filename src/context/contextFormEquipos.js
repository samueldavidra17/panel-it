import { createContext, useReducer } from "react";
import { initialFormEquipos, reducerEquipo } from "reducer/reducerEquipo";

export const contextFormEquipos = createContext();

export default function ProviderFormEquipos({children}) {
    const [state, dispatch] = useReducer(reducerEquipo, initialFormEquipos);

    return (
        <contextFormEquipos.Provider value={[state, dispatch]}>
            {children}
        </contextFormEquipos.Provider>
    );
}