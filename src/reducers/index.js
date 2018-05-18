import { combineReducers } from 'redux';
import searchResultsReducer from './reducer_recent_series_reducer'

const rootReducer = combineReducers({
    mostRecentSeries: searchResultsReducer
});

export default rootReducer;