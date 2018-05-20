import { combineReducers } from 'redux';
import mostRecentSeriesReducer from './reducer_recent_series_reducer'
import searchResultsReducer from './reducer_search_results_reducer'
import seriesDetailsReducer from './reducer_series_details'
import sermonDetailsReducer from './reducer_sermon_details'


const rootReducer = combineReducers({
    mostRecentSeries: mostRecentSeriesReducer,
    searchResults: searchResultsReducer,
    seriesDetails: seriesDetailsReducer,
    sermonDetails: sermonDetailsReducer
});

export default rootReducer;