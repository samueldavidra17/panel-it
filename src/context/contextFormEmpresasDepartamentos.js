import { createContext, useReducer } from "react";
import { initialFormEmpresaDepartamento, reducerEmpresaDepartamento } from "reducer/reducerEmpresaDepartamento";

export const contextFormEmpresasDepartamentos = createContext();

export default function ProviderFormEmpresasDepartamentos({children}) {
    const [state, dispatch] = useReducer(reducerEmpresaDepartamento, initialFormEmpresaDepartamento);

    return (
        <contextFormEmpresasDepartamentos.Provider value={[state, dispatch]}>
            {children}
        </contextFormEmpresasDepartamentos.Provider>
    );
}