import { typeEquipos } from "./action/actionEquipo";

export const initialFormEquipos = {
    equipo: {
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

export const reducerEquipo = (state, action) => {
    switch (action.type) {
        case typeEquipos.SET_EQUIPO:
            return { ...state, equipo: action.payload };
        case typeEquipos.CHANGE_PROPERTY_EQUIPO:
            return { ...state, equipo: { ...state.equipo, [action.payload.property]: action.payload.value } };
        case typeEquipos.SET_INFORMACION:
            return { ...state, informacion: action.payload };
        case typeEquipos.CHANGE_PROPERTY_INFORMACION:
            return { ...state, informacion: { ...state.informacion, [action.payload.property]: action.payload.value } };
        case typeEquipos.CHANGE_USUARIO:
            return { ...state, equipo: { ...state.equipo, usuariosforeignkey: action.payload } };
        case typeEquipos.CLEAR_STATE:
            return { ...initialFormEquipos };
        default:
            return state;
    }
}

export const setEquipo = (value) => {
    return {type: typeEquipos.SET_EQUIPO, payload: value}
}

export const changePropertyEquipo = (value) => {
    return {type: typeEquipos.CHANGE_PROPERTY_EQUIPO, payload: value}
}

export const setInformacion = (value) => {
    return {type: typeEquipos.SET_INFORMACION, payload: value}
}

export const changePropertyInformacion = (value) => {
    return {type: typeEquipos.CHANGE_PROPERTY_INFORMACION, payload: value}
}

export const changeUsuario = (value) => {
    return {type: typeEquipos.CHANGE_USUARIO, payload: value}
}
