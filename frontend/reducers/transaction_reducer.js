import {
    RECEIVE_TRANSACTIONS,
    RECEIVE_TRANSACTION
} from '../actions/transaction_actions';

const transactionReducer = (oldState = [], action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_TRANSACTIONS:
            return action.transactions;
        case RECEIVE_TRANSACTION:
            const newState = oldState.slice();
            return newState.push(action.transaction);
        default:
            return oldState;
    }
};

export default transactionReducer;