
import * as actionTypes from "./action-type";

export function mostRecentSeriesLoaded(serieses: Array<Object>){

    return {
        type: actionTypes.MOST_RECENT_SERIESES_LOADED,
        payload: serieses
    }
}