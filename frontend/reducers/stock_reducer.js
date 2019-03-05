import {RECEIVE_STOCK} from '../actions/transaction_actions';
import merge from 'lodash';

const stockReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_STOCK:
            return merge({}, action.stock);
        default:
            return oldState;
    }
};

export default stockReducer;