import * as actionTypes from "../actions/action-type";
import _ from 'lodash';

export default function (state: Array<Object> = {}, action: Object) {

    const initialState = {
        series: null,
        error: false,
        errorMessage: null,
        errorDetails: null
    }

    switch (action.type) {

        case actionTypes.SERIES_CREATED_SUCCESSFULLY:
            return {
                ...state,
                error: false,
                errorMessage: null,
                series: action.payload.data.body
            }
        case actionTypes.SERIES_CREATE_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: "Error Creating Series",
                errorDetails: action.payload.data.body
            }
        
        default:
            return state;
    }
}