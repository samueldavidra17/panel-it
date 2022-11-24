import { typeEmpresaDepartamento } from "./action";

export const initialFormEmpresaDepartamento = {
    empresa: {
        nombre: "",
        empresasDepartamentos: []
    },
    departamento: {
        nombre: "",
        empresas: []
    }
}

export const reducerEmpresaDepartamento = (state, action) => {
    switch (action.type) {
        case typeEmpresaDepartamento.SET_EMPRESA:
            return { ...state, empresa: action.payload };
        case typeEmpresaDepartamento.CHANGE_PROPERTY_EMPRESA:
            return { ...state, empresa: { ...state.empresa, [action.payload.property]: action.payload.value } };
        case typeEmpresaDepartamento.SET_DEPARTAMENTO:
            return { ...state, departamento: action.payload };
        case typeEmpresaDepartamento.CHANGE_PROPERTY_DEPARTAMENTO:
            return { ...state, departamento: { ...state.departamento, [action.payload.property]: action.payload.value } };
        case typeEmpresaDepartamento.CLEAR_STATE:
            return { ...initialFormEmpresaDepartamento };
        default:
            return state;
    }
}

export const setEmpresa = (value) => {
    return {type: typeEmpresaDepartamento.SET_EMPRESA, payload: value}
}

export const changePropertyEmpresa = (value) => {
    return {type: typeEmpresaDepartamento.CHANGE_PROPERTY_EMPRESA, payload: value}
}
export const setDepartamento = (value) => {
    return {type: typeEmpresaDepartamento.SET_DEPARTAMENTO, payload: value}
}

export const changePropertyDepartamento = (value) => {
    return {type: typeEmpresaDepartamento.CHANGE_PROPERTY_DEPARTAMENTO, payload: value}
}
