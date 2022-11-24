import { typeModelo } from "./action";

export const initialFormModelo = {
    tipoEquiposMarca: null,
    nombre: "",

}

export const reducerModelo = (state, action) => {
    switch (action.type) {
        case typeModelo.SET_MODELO:
            return { ...action.payload };
        case typeModelo.CHANGE_PROPERTY_MODELO:
            return { ...state, [action.payload.property]: action.payload.value };
        case typeModelo.CLEAR_STATE:
            return { ...initialFormModelo };
        default:
            return state;
    }
}

export const setModelo = (value) => {
    return {type: typeModelo.SET_MODELO, payload: value}
}

export const changePropertyModelo = (value) => {
    return {type: typeModelo.CHANGE_PROPERTY_MODELO, payload: value}
}
