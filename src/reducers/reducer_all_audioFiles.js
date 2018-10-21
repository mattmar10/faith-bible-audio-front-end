import * as actionTypes from "../actions/action-type";

export default function (state: Array<Object> = {}, action: Object) {

    switch (action.type) {
        case actionTypes.AUDIO_FILES_LOADED:
            return {
                ...state,
                isFetching: false,
                error: false,
                errorMessage: null,
                audioFiles: action.payload.data.body
            }
        case actionTypes.AUDIO_FILES_LOAD_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: "Error Fetching Audio Files"
            }

        default:
            return state;
    }
}