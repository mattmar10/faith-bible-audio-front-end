import { API_ROOT } from '../api/api-config';
import ApiGateway from "../api/api-gateway";
import hasErrors from "../utils/has-errors-util";
import * as actions from "../actions/index"


export default class SermonService {
    constructor() {
        this.apiGateway = new ApiGateway();
    }

    updateSermon(sermonId: int, sermon: Object){
        console.log('updating ' + sermonId);

        return (dispatch: Function) => {
            return this.apiGateway.patch(API_ROOT + `/sermon/${sermonId}`, sermon)

                .then((result) => {
                    console.log(result);
                    if (hasErrors(result)) {
                        dispatch(actions.sermonDetailsUpdateFailed(result));
                    } else {
                        dispatch(actions.sermonDetailsUpdatedSuccessfully(result));
                    }
                    return result;
                });
        }
    }

    incrementPlayCount(sermonId: int) {

        return (dispatch: Function) => {
            return this.apiGateway.put(API_ROOT + `/sermon/${sermonId}/play`, {})

                .then((result) => {
                    if (hasErrors(result)) {
                        dispatch(actions.sermonDetailsUpdateFailed(result));
                    } else {
                        dispatch(actions.sermonDetailsUpdatedSuccessfully(result));
                    }
                    return result;
                });
        }
    }

    incrementFavoriteCount(sermonId: int) {

        return (dispatch: Function) => {
            return this.apiGateway.put(API_ROOT + `/sermon/${sermonId}/like`, {})

                .then((result) => {
                    if (hasErrors(result)) {
                        dispatch(actions.sermonDetailsUpdateFailed(result));
                    } else {
                        dispatch(actions.sermonDetailsUpdatedSuccessfully(result));
                    }
                    return result;
                });
        }

    }

    getSermonById(sermonId: string) {
        return (dispatch: Function) => {
            return this.apiGateway.get(API_ROOT + '/sermon/' + sermonId)
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

    getSermonDetailsBySlug(sermonSlug: string) {
        return (dispatch: Function) => {
            return this.apiGateway.get(API_ROOT + '/sermon/slug/' + sermonSlug)
                .then((result) => {
                    if (hasErrors(result)) {
                        dispatch(actions.sermonDetailsLoadError(result));
                    } else {
                        // console.log(result);
                        dispatch(actions.sermonDetailsLoaded(result));
                    }
                    return result;
                });
        }
    }

    loadAllSermons(){
        return(dispatch: Function) => {
            return this.apiGateway.get(API_ROOT + '/sermons')
                .then((result) => {
                    if(hasErrors(result)){
                        dispatch(actions.loadSermonsError(result));
                    } else {
                        dispatch(actions.sermonsLoadedSuccessfully(result));
                    }
                    return result;
                });
        }
    }

    loadAllSeries(){
        return(dispatch: Function) => {
            return this.apiGateway.get(API_ROOT + '/series')
                .then((result) => {
                    if(hasErrors(result)){
                        dispatch(actions.loadSeriesError(result));
                    } else {
                        dispatch(actions.seriesLoadedSuccessfully(result));
                    }
                    return result;
                });
        }
    }

    loadUnmappedSermons(){
        return(dispatch: Function) => {
            return this.apiGateway.get(API_ROOT + '/audiofiles/unmapped')
                .then((result) => {
                    if(hasErrors(result)){
                        dispatch(actions.unmappedSermonsLoadError(result));
                    } else {
                        dispatch(actions.umappedSermonsLoadedSuccessfully(result));
                    }
                    return result;
                });
        }
    }
    
}