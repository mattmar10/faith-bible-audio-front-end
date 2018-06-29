
import * as actionTypes from "./action-type";

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

export function seriesSearchResultsLoaded(searchTerm: string, results: Object){

    return {
        type: actionTypes.SERIES_SEARCH_RESULTS_LOADED,
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

export function seriesSearchResultsError(errors: Array<Object>){
    return {
        type: actionTypes.SERIES_SEARCH_RESULTS_ERROR,
        payload: errors
    }
}

export function seriesDetailsLoaded(result: Object){
    return {
        type: actionTypes.SERIES_DETAILS_LOADED,
        payload: result
    }
}

export function clearSeriesDetails(){
    return {
        type: actionTypes.CLEAR_SERIES_DETAILS
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

export function sermonDetailsUpdatedSuccessfully(result: Object){
    return {
        type: actionTypes.SERMON_DETAILS_UPDATED_SUCCESSFULLY,
        payload: result
    }
}

export function sermonDetailsUpdateFailed(result: Object){
    return {
        type: actionTypes.SERMON_DETAILS_UPDATE_FAILED,
        payload: result
    }
}

export function sermonDetailsLoadError(errors: Array<Object>){
    return {
        type: actionTypes.SERMON_DETAILS_LOAD_ERROR,
        payload: errors
    }
}

export function clearSermonDetails(){
    return {
        type: actionTypes.CLEAR_SERMON_DETAILS
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

export function favoriteSermon(sermonId: string){
    return{
        type: actionTypes.FAVORITE_SERMON,
        payload: sermonId
    }
}

export function seriesLoadedSuccessfully(series: Array<Object>){
    return {
        type: actionTypes.ALL_SERIES_LOADED,
        payload: series
    }
}

export function loadSeriesError(errors: Array<Objec>){
    return {
        type: actionTypes.ALL_SERIES_LOAD_ERROR,
        payload: errors
    }
}

export function loadSermonsError(errors: Array<Object>){
    return {
        type: actionTypes.ALL_SERMONS_LOAD_ERROR,
        payload: errors
    }
}

export function sermonsLoadedSuccessfully(sermons: Array<Object>){
    return {
        type: actionTypes.ALL_SERMONS_LOADED,
        payload: sermons
    }
}