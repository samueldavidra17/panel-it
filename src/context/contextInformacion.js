import { createContext, useState } from "react";

export const contextFormInformacion = createContext();

export default function ProviderFormInformacion({children}) {
    const [state, setState] = useState("");

    const changeState = (value) => {
        if(value.type) setState("");
        else setState(value);
    }

    return (
        <contextFormInformacion.Provider value={[state, changeState]}>
            {children}
        </contextFormInformacion.Provider>
    );
}