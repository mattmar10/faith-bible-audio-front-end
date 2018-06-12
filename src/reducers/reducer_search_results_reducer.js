import _ from 'lodash';
import * as actionTypes from "../actions/action-type";

export default function (state: Array<Object> = {}, action: Object) {

    switch (action.type) {
        case actionTypes.SEARCH_RESULTS_LOADED:
            const mapped = _.mapKeys(action.payload.data.content, 'id');
            return {
                ...state,
                isFetching: false,
                error: false,
                errorMessage: null,
                sermons: action.payload.data.content,
                searchTerm: action.searchTerm
            }
        case actionTypes.FETCH_SEARCH_RESULTS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: "Error Fetching Search Results"
            }
        case actionTypes.SERIES_SEARCH_RESULTS_LOADED:
            const series_mapped = _.mapKeys(action.payload.data.body.content, 'id');
            return {
                ...state,
                seriesError: false,
                series: action.payload.data.body.content
            }
        case actionTypes.SERIES_SEARCH_RESULTS_ERROR:
            return {
                ...state,
                seriesError: true,
                errorMessage: "Error fetching series results"
            }
        case actionTypes.SERMON_DETAILS_UPDATED_SUCCESSFULLY:
            const updated = action.payload.data.body;
            const sermons = state.sermons;

            if(sermons){
                var toUpdate = sermons[updated.id]

                if(toUpdate){
                    toUpdate = updated
                    sermons[toUpdate.id] = toUpdate;

                    const newData = Object.assign({}, sermons);

                    return {
                        ...state,
                        isFetching: false,
                        error: false,
                        errorMessage: null,
                        sermons: newData,
                        searchTerm: action.searchTerm
                    }
                }
                else{
                    return state;
                }


            }

            return state;


        default:
            return state;
    }
}