import {RECEIVE_STOCK, RECEIVE_STOCKS} from '../actions/transaction_actions';
import {merge} from 'lodash';

const stockReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_STOCKS:
            return merge({}, action.stocks);
        case RECEIVE_STOCK:
            return merge({}, oldState, {[action.stock.id]: action.stock});
        default:
            return oldState;
    }
};

export default stockReducer;