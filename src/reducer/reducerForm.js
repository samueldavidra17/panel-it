const type = {
    SET_STATE: "SET_FORM",
    CHANGE_PROPERTY: "CHANGE_PROPERTY",
    CLEAR_STATE: "CLEAR_STATE"
} 

export const initialState = {}

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

export const setState = (value) => {
    return {type: type.SET_STATE, payload: value}
}

export const changeProperty = (property, value) => {
    return {type: type.CHANGE_PROPERTY, payload: {property, value}}
}

export const clearState = (value) => {
    return {type: type.CLEAR_STATE}
}

