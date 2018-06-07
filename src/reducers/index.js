import { combineReducers } from 'redux';
import mostRecentSeriesReducer from './reducer_recent_series_reducer'
import searchResultsReducer from './reducer_search_results_reducer'
import seriesDetailsReducer from './reducer_series_details'
import sermonDetailsReducer from './reducer_sermon_details'
import playSermonReducer from './reducer_play_sermon_audio'
import showAudioPlayer from './reducer_show_audio_player'

import sermonDetailsUpdateReducer from './reducer_sermon_update'

const rootReducer = combineReducers({
    mostRecentSeries: mostRecentSeriesReducer,
    searchResults: searchResultsReducer,
    seriesDetails: seriesDetailsReducer,
    sermonDetails: sermonDetailsReducer,
    sermonForAudio: playSermonReducer,
    showAudioPlayer: showAudioPlayer,
    sermonForAudio: playSermonReducer,
    sermonUpdated: sermonDetailsUpdateReducer
});

export default rootReducer;