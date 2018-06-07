import { API_ROOT } from '../api/api-config';
import ApiGateway from "../api/api-gateway";
import hasErrors from "../utils/has-errors-util";
import * as actions from "../actions/index"


export default class SermonService {
    constructor() {
        this.apiGateway = new ApiGateway();
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

    incrementLikeCount(sermonId: int) {

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
}