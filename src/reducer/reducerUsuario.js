import { typeUsuarios } from "./action";

export const initialFormUsuarios = {
    nombre: "",
    cargo: "",
    empresa: 0,
    departamento: 0
}

export const reducerUsuario = (state, action) => {
    switch (action.type) {
        case typeUsuarios.SET_USUARIO:
            return { ...action.payload };
        case typeUsuarios.CHANGE_PROPERTY_USUARIO:
            return { ...state, [action.payload.property]: action.payload.value };
        case typeUsuarios.CLEAR_STATE:
            return { ...initialFormUsuarios };
        default:
            return state;
    }
}

export const setUsuario = (value) => {
    return {type: typeUsuarios.SET_USUARIO, payload: value}
}

export const changePropertyUsuario = (value) => {
    return {type: typeUsuarios.CHANGE_PROPERTY_USUARIO, payload: value}
}
