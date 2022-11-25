import { typeDispositivos } from "./action";

export const initialFormDispositivos = {
    dispositivo: {
        serial: "",
        serial_cargador: "",
        serial_unidad: "",
        dd: "",
        ram: "",
        tipo_ram: "",
        csb: "",
        antivirus: "",
        so: "",
        modelo: null,
        empresa: null,
        usuarios: null
    },
    informacion: {}
}

export const reducerDispositivo = (state, action) => {
    switch (action.type) {
        case typeDispositivos.SET_DISPOSITIVO:
            return { ...state, dispositivo: action.payload };
        case typeDispositivos.CHANGE_PROPERTY_DISPOSITIVO:
            return { ...state, dispositivo: { ...state.dispositivo, [action.payload.property]: action.payload.value } };
        case typeDispositivos.SET_INFORMACION:
            return { ...state, informacion: action.payload };
        case typeDispositivos.CHANGE_PROPERTY_INFORMACION:
            return { ...state, informacion: { ...state.informacion, [action.payload.property]: action.payload.value } };
        case typeDispositivos.CHANGE_USUARIO:
            return { ...state, dispositivo: { ...state.dispositivo, usuarios: action.payload } };
        case typeDispositivos.CLEAR_STATE:
            return { ...initialFormDispositivos };
        default:
            return state;
    }
}

export const setDispositivo = (value) => {
    return {type: typeDispositivos.SET_DISPOSITIVO, payload: value}
}

export const changePropertyDispositivo = (value) => {
    return {type: typeDispositivos.CHANGE_PROPERTY_DISPOSITIVO, payload: value}
}

export const setInformacion = (value) => {
    return {type: typeDispositivos.SET_INFORMACION, payload: value}
}

export const changePropertyInformacion = (value) => {
    return {type: typeDispositivos.CHANGE_PROPERTY_INFORMACION, payload: value}
}

export const changeUsuario = (value) => {
    return {type: typeDispositivos.CHANGE_USUARIO, payload: value}
}
