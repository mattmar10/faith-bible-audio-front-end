import * as actionTypes from "../actions/action-type";

export default function (state: Array<Object> = {}, action: Object) {

    const initialState = {
        sermon: null,
        dataFetched: false,
        isFetching: false,
        error: false,
        errorMessage: null
    }

    switch (action.type) {
        case actionTypes.SERMON_DETAILS_LOADED:
            return {
                ...state,
                isFetching: false,
                error: false,
                errorMessage: null,
                sermon: action.payload.data
            }
        case actionTypes.SERMON_DETAILS_LOAD_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: "Error Fetching Sermon Details"
            }
        default:
            return state;
    }
}