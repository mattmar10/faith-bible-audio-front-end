import * as actionTypes from "../actions/action-type";

export default function (state: Array<Object> = {}, action: Object) {

    switch (action.type) {
        case actionTypes.CLEAR_ALL_SERIES:
            return{
                ...state,
                isFetching: false,
                error: false,
                errorMessage: null,
                series: null
            }
        case actionTypes.ALL_SERIES_LOADED:
            return {
                ...state,
                isFetching: false,
                error: false,
                errorMessage: null,
                series: action.payload.data.body
            }
        case actionTypes.ALL_SERIES_LOAD_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: "Error Fetching Series"
            }
        
        default:
            return state;
    }
}