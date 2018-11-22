import { API_ROOT } from '../api/api-config';
import ApiGateway from "../api/api-gateway";
import hasErrors from "../utils/has-errors-util";
import * as actions from "../actions/index"


export default class SeriesService {
    constructor() {
        this.apiGateway = new ApiGateway();
    }

    createSeries(title: string, imageURL: string, tags: Array) {

        const slug = title.replace(/\s/g,'+').toLowerCase();

        const series = {
            title: title,
            slug: slug,
            imageURL: imageURL,
            tags: tags
        }

        return (dispatch: Function) => {
            return this.apiGateway.post(API_ROOT + `/series`, series)

                .then((result) => {
                    if (hasErrors(result)) {
                        dispatch(actions.seriesCreatedError(result));
                    } else {
                        dispatch(actions.seriesCreatedSuccessfully(result));
                    }
                    return result;
                });
        }
    }

}