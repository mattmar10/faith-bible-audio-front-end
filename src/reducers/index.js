import { combineReducers } from 'redux';
import searchResultsReducer from './reducer_search_results_reducer'

const rootReducer = combineReducers({
    mostRecentSeries: searchResultsReducer
});

export default rootReducer;