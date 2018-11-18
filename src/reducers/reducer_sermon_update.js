import * as actionTypes from "../actions/action-type";

export default function (state: Array<Object> = {}, action: Object) {

    switch (action.type) {
        case actionTypes.SERMON_DETAILS_UPDATED_SUCCESSFULLY:
            return {
                sermon: action.payload.data.body
            }
        case actionTypes.SERMON_DETAILS_UPDATE_FAILED:
            return {
                sermon: action.payload,
                errorMessage: "Error Updating Sermon"
            }
        default:
            return state;
    }
}