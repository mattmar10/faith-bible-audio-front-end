import * as actionTypes from "../actions/action-type";

export default function (state: Array<Object> = {}, action: Object) {

    switch (action.type) {
        case actionTypes.SHOW_AUDIO_PLAYER:

            return {
                value: action.payload
            }

        default:
            return state;
    }
}