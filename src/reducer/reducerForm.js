const type = {
    SET_STATE: "SET_FORM",
    CHANGE_PROPERTY: "CHANGE_PROPERTY",
    CLEAR_STATE: "CLEAR_STATE"
} 
//reducer de los formularios
//https://reactjs.org/docs/hooks-reference.html#usereducer --> doc de react sobre los reducer
export const initialState = {}
//este reducer almacena un json que crea las propiedasdes dinamicamente por las props que se envien
export const reducerForm = (state, action) => {
    switch (action.type) {
        case type.SET_STATE:
            return { ...action.payload };
        case type.CHANGE_PROPERTY:
            return { ...state, [action.payload.property]: action.payload.value };
        case type.CLEAR_STATE:
            return { ...initialState };
    }
}
//funciones reductoras que devuelven la estructura de un action automaticamente (type, payload)
export const setState = (value) =>  ({type: type.SET_STATE, payload: value})

export const changeProperty = (property, value) => ({type: type.CHANGE_PROPERTY, payload: {property, value}});

export const clearState = () => ({type: type.CLEAR_STATE})

