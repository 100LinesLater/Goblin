import {
    LOGOUT_CURRENT_USER, 
    RECEIVE_CURRENT_USER} from '../actions/session_actions';

const sessionReducer = (oldState = { id: null }, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {id: action.currentUser.id}
        case LOGOUT_CURRENT_USER:
            return {id: null};
        default:
            return oldState;
    }
};

export default sessionReducer;