import * as actionTypes from "../actions/action-type";

export default function(state: Array<Object> = [], action: Object) {

    switch (action.type) {
        case actionTypes.MOST_RECENT_SERIESES_LOADED:
            return action.payload.data;

        default:
            return state;
    }
}