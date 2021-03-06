import * as actionTypes from "../actions/action-type";

export default function(state: Array<Object> = [], action: Object) {

    const initialState = {
        data: [],
        dataFetched: false,
        isFetching: false,
        error: false,
        errorMessage: null
    }

    switch (action.type) {
        case actionTypes.MOST_RECENT_SERIES_LOADED:
            return {
                ...state,
                data: action.payload.data,
                dataFetched: true,
                isFetching: false,
                error: false,
                errorMessage: null,
            }
        case actionTypes.MOST_RECENT_SERIES_ERROR:
            return {
                ...state,
                dataFetched: false,
                isFetching: false,
                error: true,
                errorMessage: 'Error fetching the most recent series.',
            }
        default:
            return state;
    }
}