import { createContext, useReducer } from "react";
import { initialState, reducerForm } from "reducer/reducerForm";

export const contextForm = createContext();

export default function ProviderForm({children}) {
    const [state, dispatch] = useReducer(reducerForm, initialState);
    
    return (
        <contextForm.Provider value={[state, dispatch]}>
            {children}
        </contextForm.Provider>
    );
}