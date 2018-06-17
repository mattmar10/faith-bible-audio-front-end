import * as actionTypes from "../actions/action-type";
import StaticRouter from "react-router-dom/StaticRouter";
import _ from 'lodash';

export default function (state: Array<Object> = {}, action: Object) {

    const initial = [];
    switch (action.type) {
        case actionTypes.FAVORITE_SERMON:
            const sermonId = action.payload;
            const favorites = state.sermons || initial;

            if(favorites.includes(sermonId)){
                return {sermons: favorites};
            }
            else{
                const newFavorites = _.clone(favorites);
                newFavorites.push(sermonId);
                return {sermons: newFavorites};
            }
            
        default:
            return state;
    }
}