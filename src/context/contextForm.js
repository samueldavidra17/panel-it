import { createContext, useReducer } from "react";
import { initialState, reducerForm } from "reducer/reducerForm";
//contexto de los formularios
//https://reactjs.org/docs/context.html --> doc de react sobre los context 
export const contextForm = createContext();

export default function ProviderForm({children}) {
    //reducer del estado de los formularios 
    const [state, dispatch] = useReducer(reducerForm, initialState);
    
    return (
        <contextForm.Provider value={[state, dispatch]}>
            {children}
        </contextForm.Provider>
    );
}