import * as actionTypes from "../actions/action-type";

export default function (state: Array<Object> = {}, action: Object) {

    switch (action.type) {
        case actionTypes.CLEAR_ALL_SERMONS:
            return{
                ...state,
                isFetching: false,
                error: false,
                errorMessage: null,
                sermons: null
            }
        case actionTypes.ALL_SERMONS_LOADED:
            
            const allSermons = action.payload.data.body;

            const mapped = allSermons.map(s => s.speaker);
            const uniqueSpeakers = Array.from(new Set(mapped));

            return {
                ...state,
                isFetching: false,
                error: false,
                errorMessage: null,
                sermons: allSermons,
                speakers: uniqueSpeakers
            }
        case actionTypes.ALL_SERMONS_LOAD_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: "Error Fetching Sermons"
            }

        case actionTypes.SERMON_DETAILS_UPDATED_SUCCESSFULLY:
            const updated = action.payload.data.body;
            const sermons = state.sermons;

            if(sermons){
                var toUpdate = sermons[updated.id]

                if(toUpdate){
                    toUpdate = updated
                    sermons[toUpdate.id] = toUpdate;

                    const newData = Object.assign({}, sermons);

                    return {
                        ...state,
                        isFetching: false,
                        error: false,
                        errorMessage: null,
                        sermons: newData,
                    }
                }
                else{
                    return state;
                }

            }

            return state;
        
        default:
            return state;
    }
}