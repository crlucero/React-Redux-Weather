
import constants from "./../constants/index";
const { initialState, types } = constants;

export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_LOCATION:
            return [state, {
                location: action.location
            }]

        default:
            return state;

    }
}