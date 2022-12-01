const type = {
    ADD_OPTION: "ADD_OPTION",
}
export const initialComboxState = {}

export const reducerCombox = (state, action) => {
    const { option, values } = action.payload;

    switch (action.type) {
        case type.ADD_OPTION:
            return { ...state, [option]: [...values] };
    }
}

export const addOption = (option, values) => {
    return { type: type.ADD_OPTION, payload: { option, values }};
}