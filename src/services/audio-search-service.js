import ApiGateway from "../api/api-gateway";
import hasErrors from "../utils/has-errors-util";

export default class AudioSearchService {
    constructor(){
        this.apiGateway = new ApiGateway();
    }

    freeTextSearch(searchQuery: string, pageNum: int, size: int) {
        return this.apiGateway.get('http://localhost:8080/search',
            {
                q: searchQuery,
                page: pageNum,
                size: size
            })
            .then((result) => {
                if (hasErrors(result)) {
                    console.log('errors fetching search results');
                    console.log(result);
                    //dispatch(actions.allProductModifiersLoadedFailed(result));
                } else {
                    console.log('success fetching search results');
                    console.log(result);
                    //dispatch(actions.allProductModifiersLoaded(result));
                }
                return result;
            });
    }

    getMostRecent(count: int) {
        return this.apiGateway.get('http://localhost:8080/sermons/mostrecent',
            {
                count: count
            })
            .then((result) => {
                if (hasErrors(result)) {
                    console.log('errors fetching most recent results');
                    //dispatch(actions.allProductModifiersLoadedFailed(result));
                } else {
                    console.log('success fetching most recent results');
                    //dispatch(actions.allProductModifiersLoaded(result));
                }
                return result;
            });
    }
}

