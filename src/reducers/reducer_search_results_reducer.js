import _ from 'lodash';
import * as actionTypes from "../actions/action-type";

export default function (state: Array<Object> = {}, action: Object) {

    const initialState = {
        data: [],
        dataFetched: false,
        isFetching: false,
        error: false,
        errorMessage: null
    }

    switch (action.type) {
        case actionTypes.SEARCH_RESULTS_LOADED:
            const mapped = _.mapKeys(action.payload.data.content, 'id');
            console.log(mapped);
            return {
                ...state,
                isFetching: false,
                error: false,
                errorMessage: null,
                data: mapped
            }
        case actionTypes.FETCH_SEARCH_RESULTS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: "Error Fetching Search Results"
            }
        default:
            return state;
    }
}