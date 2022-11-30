import { typeImpresoras } from "./action";

export const initialFormImpresoras = {
    impresora: {
        serial: "",
        csb: "",
        toner: "",
        ip: "",
        tipo_conexion: "",
        modelos: null,
        departamento: null
    },
    informacion: {}
}

export const reducerImpresora = (state, action) => {
    switch (action.type) {
        case typeImpresoras.SET_IMPRESORA:
            return { ...state, impresora: action.payload };
        case typeImpresoras.CHANGE_PROPERTY_IMPRESORA:
            return { ...state, impresora: { ...state.impresora, [action.payload.property]: action.payload.value } };
        case typeImpresoras.SET_INFORMACION:
            return { ...state, informacion: action.payload };
        case typeImpresoras.CHANGE_PROPERTY_INFORMACION:
            return { ...state, informacion: { ...state.informacion, [action.payload.property]: action.payload.value } };
        case typeImpresoras.CHANGE_USUARIO:
            return { ...state, impresora: { ...state.impresora, usuarios: action.payload } };
        case typeImpresoras.CLEAR_STATE:
            return { ...initialFormImpresoras };
        default:
            return state;
    }
}

export const setImpresora = (value) => {
    return {type: typeImpresoras.SET_IMPRESORA, payload: value}
}

export const changePropertyImpresora = (value) => {
    return {type: typeImpresoras.CHANGE_PROPERTY_IMPRESORA, payload: value}
}

export const setInformacion = (value) => {
    return {type: typeImpresoras.SET_INFORMACION, payload: value}
}

export const changePropertyInformacion = (value) => {
    return {type: typeImpresoras.CHANGE_PROPERTY_INFORMACION, payload: value}
}

export const changeUsuario = (value) => {
    return {type: typeImpresoras.CHANGE_USUARIO, payload: value}
}
