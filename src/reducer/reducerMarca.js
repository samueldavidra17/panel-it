import { typeMarca } from "./action";

export const initialFormMarca = {
    tipoEquipos: null,
    nombre: "",
    modelos: []

}

export const reducerMarca = (state, action) => {
    switch (action.type) {
        case typeMarca.SET_MARCA:
            return { ...state, ...action.payload };
        case typeMarca.CHANGE_PROPERTY_MARCA:
            return { ...state, [action.payload.property]: action.payload.value };
        case typeMarca.CLEAR_STATE:
            return { ...initialFormMarca };
        default:
            return state;
    }
}

export const setMarca = (value) => {
    return {type: typeMarca.SET_MARCA, payload: value}
}

export const changePropertyMarca = (value) => {
    return {type: typeMarca.CHANGE_PROPERTY_MARCA, payload: value}
}
