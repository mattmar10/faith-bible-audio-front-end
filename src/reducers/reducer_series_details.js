import * as actionTypes from "../actions/action-type";

export default function (state: Array<Object> = {}, action: Object) {

    const initialState = {
        series: null,
        dataFetched: false,
        isFetching: false,
        error: false,
        errorMessage: null
    }

    switch (action.type) {
        case actionTypes.SERIES_DETAILS_LOADED:
            return {
                ...state,
                isFetching: false,
                error: false,
                errorMessage: null,
                series: action.payload.data.body
            }
        case actionTypes.SERIES_DETAILS_LOAD_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: "Error Fetching Series Details"
            }
        default:
            return state;
    }
}