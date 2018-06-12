import * as actionTypes from "../actions/action-type";
import _ from 'lodash';

export default function (state: Array<Object> = {}, action: Object) {

    const initialState = {
        series: null,
        dataFetched: false,
        isFetching: false,
        error: false,
        errorMessage: null
    }

    switch (action.type) {
        case actionTypes.LOAD_SERIES_DETAILS:
            return {
                ...state,
                isFetching: true,
                error: false,
                errorMessage: null,
                series: null
            }
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
        case actionTypes.SERMON_DETAILS_UPDATED_SUCCESSFULLY:
            const updated = action.payload.data.body;
            const previous = state.series;

            if(previous){
                const sermons = previous.sermons;
                const toUpdate = _.find(sermons, function(sermon) {
                    return sermon.id == updated.id;
                });

                if(toUpdate) {
                    toUpdate.stats = updated.stats;

                    const newSeries = {...previous, sermons: sermons}

                    return {
                        ...state,
                        isFetching: false,
                        error: false,
                        errorMessage: null,
                        series: newSeries
                    }
                }
                else{
                    return state;
                }
            }
            else{
                return state;
            }
        default:
            return state;
    }
}