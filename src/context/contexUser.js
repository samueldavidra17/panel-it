import { createContext, useState } from "react";
//contexto de los formularios
//https://reactjs.org/docs/context.html --> doc de react sobre los context 
export const contextUser = createContext();

export default function ProviderUser({children}) {
    //reducer del estado de los formularios 
    const [user, setUser] = useState(null);

    const changeUser = (value) => setUser(value)

    return (
        <contextUser.Provider value={{user, changeUser}}>
            {children}
        </contextUser.Provider>
    );
}