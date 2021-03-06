import ApiGateway from "../api/api-gateway";
import {API_ROOT} from "../api/api-config"
import hasErrors from "../utils/has-errors-util";
import * as actions from "../actions/index"

export default class AudioSearchService {
    constructor() {
        this.apiGateway = new ApiGateway();
    }


    freeTextSearch(searchQuery: string, pageNum: int = 0, size: int = 500) {

        return (dispatch: Function) => {
            return this.apiGateway.get(API_ROOT + '/search',
                {
                    q: searchQuery,
                    page: pageNum,
                    size: size
                })
                .then((result) => {
                    if (hasErrors(result)) {
                        console.log('errors fetching search results');
                        dispatch(actions.fetchSearchResultsError(result));
                    } else {
                        dispatch(actions.searchResultsLoaded(searchQuery, result));
                    }
                    return result;
                });
        }

    }

    freeTextSeriesSearch(searchQuery: string, pageNum: int = 0, size: int = 500) {

        return (dispatch: Function) => {
            return this.apiGateway.get(API_ROOT + '/series/search',
                {
                    q: searchQuery,
                    page: pageNum,
                    size: size
                })
                .then((result) => {
                    if (hasErrors(result)) {
                        console.log('errors fetching search results');
                        dispatch(actions.seriesSearchResultsError(result));
                    } else {
                        dispatch(actions.seriesSearchResultsLoaded(searchQuery, result));
                    }
                    return result;
                });
        }

    }

    getMostRecentSeries(count: int) {
        return (dispatch: Function) => {
            return this.apiGateway.get(API_ROOT + '/series/mostrecent', {
                count: count
            })
                .then((result) => {
                    if (hasErrors(result)) {
                        dispatch(actions.mostRecentSeriesLoadedError(result))
                    } else {
                        // console.log(result);
                        dispatch(actions.mostRecentSeriesLoaded(result));
                    }
                    return result;
                });
        }
    }

    getSeriesDetails(slug: string) {
        return (dispatch: Function) => {
            return this.apiGateway.get(API_ROOT + '/series/slug/' + slug)
                .then((result) => {
                    if (hasErrors(result)) {
                        dispatch(actions.seriesDetailsLoadError(result))
                    } else {
                        dispatch(actions.seriesDetailsLoaded(result));
                    }
                    return result;
                });
        }
    }

}

