import * as actionTypes from "../actions/action-type";

export default function (state: Array<Object> = {}, action: Object) {

    switch (action.type) {
        case actionTypes.PLAY_SERMON_AUDIO:

            var played = state.played;

            if(played && ! action.payload.id in played){
                played.push(action.payload.id)
            }else{
                if(!played){played = [action.payload.id]}
            }

            return {
                ...state,
                played,
                sermon: action.payload
            }

        default:
            return state;
    }
}