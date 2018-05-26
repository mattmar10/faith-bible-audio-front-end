import ApiGateway from "../api/api-gateway";
import hasErrors from "../utils/has-errors-util";
import * as actions from "../actions/index"

const baseUrl = 'http://fbc-media-dev-lb-772092556.us-east-1.elb.amazonaws.com';
//const baseUrl = 'http://localhost:8080';

export default class AudioSearchService {
    constructor() {
        this.apiGateway = new ApiGateway();
    }


    freeTextSearch(searchQuery: string, pageNum: int = 0, size: int = 500) {

        return (dispatch: Function) => {
            return this.apiGateway.get(baseUrl + '/search',
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

    getMostRecentSeries(count: int) {
        return (dispatch: Function) => {
            return this.apiGateway.get(baseUrl + '/series/mostrecent', {
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

    getSermonDetails(sermonId: string) {
        return (dispatch: Function) => {
            return this.apiGateway.get(baseUrl + '/sermon/' + sermonId)
                .then((result) => {
                    if (hasErrors(result)) {
                        dispatch(actions.sermonDetailsLoadError(result))
                    } else {
                        // console.log(result);
                        dispatch(actions.sermonDetailsLoaded(result));
                    }
                    return result;
                });
        }
    }

    getSeriesDetails(slug: string) {
        return (dispatch: Function) => {
            return this.apiGateway.get(baseUrl + '/series/slug/' + slug)
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

