import _ from 'lodash';
import * as actionTypes from "../actions/action-type";

export default function (state: Array<Object> = {}, action: Object) {

    const initialState = {
        searchTerm: "",
        data: [],
        dataFetched: false,
        isFetching: false,
        error: false,
        errorMessage: null
    }

    switch (action.type) {
        case actionTypes.SEARCH_RESULTS_LOADED:
            const mapped = _.mapKeys(action.payload.data.content, 'id');
            return {
                ...state,
                isFetching: false,
                error: false,
                errorMessage: null,
                data: mapped,
                searchTerm: action.searchTerm
            }
        case actionTypes.FETCH_SEARCH_RESULTS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: "Error Fetching Search Results"
            }
        case actionTypes.SERMON_DETAILS_UPDATED_SUCCESSFULLY:
            const updated = action.payload.data.body;
            const sermons = state.data;

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
                        data: newData,
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