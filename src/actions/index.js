
import * as actionTypes from "./action-type";
import AudioSearchService from '../services/audio-search-service'

export function mostRecentSeriesLoaded(series: Array<Object>){

    return {
        type: actionTypes.MOST_RECENT_SERIES_LOADED,
        payload: series
        
    }
}

export function mostRecentSeriesLoadedError(errors: Array<Object>){

    return {
        type: actionTypes.MOST_RECENT_SERIES_ERROR,
        payload: errors
    }
}

export function searchStarted(searchTerm: string){

    return {
        type: actionTypes.SEARCH_STARTED,
        payload: searchTerm
    }
}

export function searchResultsLoaded(searchTerm: string, results: Object){

    return {
        type: actionTypes.SEARCH_RESULTS_LOADED,
        payload: results,
        searchTerm: searchTerm
    }
}

export function fetchSearchResultsError(errors: Array<Object>){
    return {
        type: actionTypes.FETCH_SEARCH_RESULTS_ERROR,
        payload: errors
    }
}

export function seriesDetailsLoaded(result: Object){
    return {
        type: actionTypes.SERIES_DETAILS_LOADED,
        payload: result
    }
}

export function seriesDetailsLoadError(errors: Array<Object>){
    return {
        type: actionTypes.SERIES_DETAILS_LOAD_ERROR,
        payload: errors
    }
}

export function sermonDetailsLoaded(result: Object){
    return {
        type: actionTypes.SERMON_DETAILS_LOADED,
        payload: result
    }
}

export function sermonDetailsLoadError(errors: Array<Object>){
    return {
        type: actionTypes.SERMON_DETAILS_LOAD_ERROR,
        payload: errors
    }
}

export function playSermonAudio(sermon: Object){
    return {
        type: actionTypes.PLAY_SERMON_AUDIO,
        payload: sermon
    }
}

export function showAudioPlayer(showPlayer: boolean){
    return {
        type: actionTypes.SHOW_AUDIO_PLAYER,
        payload: showPlayer
    }
}