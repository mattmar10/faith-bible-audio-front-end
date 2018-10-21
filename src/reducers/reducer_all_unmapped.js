import * as actionTypes from "../actions/action-type";

export default function (state: Array<Object> = {}, action: Object) {

    switch (action.type) {
        case actionTypes.UNMAPPED_SERMONS_LOAD_ERROR:
            return{
                ...state,
                isFetching: false,
                error: true,
                errorMessage: "Error Fetching Unmapped Sermons"
            }
        case actionTypes.UNMAPPED_SERMONS_LOADED:
            return {
                ...state,
                isFetching: false,
                error: false,
                errorMessage: null,
                sermons: action.payload.data.body
            }

        default:
            return state;
    }
}