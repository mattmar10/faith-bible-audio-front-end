import * as actionTypes from "../actions/action-type";

export default function (state: Array<Object> = {}, action: Object) {

    switch (action.type) {
        case actionTypes.PLAY_SERMON_AUDIO:

            return {
                ...state,
                sermon: action.payload
            }

        default:
            return state;
    }
}