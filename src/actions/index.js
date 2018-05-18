
import * as actionTypes from "./action-type";
import AudioSearchService from '../services/audio-search-service'

const audioSearchService = new AudioSearchService();

export function mostRecentSeriesLoaded(serieses: Array<Object>){

    return {
        type: actionTypes.MOST_RECENT_SERIESES_LOADED,
        payload: audioSearchService.getMostRecentSeries(6)
        
    }
}

export function fetchSearchResults(query: string, pageNum: int, count: int){

    return {
        type: actionTypes.FETCH_SEARCH_RESULTS,
        payload: audioSearchService.freeTextSearch(query, pageNum, count)
    }
}