import { API_ROOT } from '../api/api-config';
import ApiGateway from "../api/api-gateway";
import hasErrors from "../utils/has-errors-util";
import * as actions from "../actions/index"


export default class AudioFileService {
    constructor() {
        this.apiGateway = new ApiGateway();
    }

    loadAllAudioFiles() {
        return(dispatch: Function) => {
            return this.apiGateway.get(API_ROOT + '/audiofiles/unmapped')
                .then((result) => {
                    if(hasErrors(result)){
                        dispatch(actions.audioFilesLoadError(result));
                    } else {
                        dispatch(actions.audioFilesLoadedSuccessfully(result));
                    }
                    return result;
                });
        }
    }
}