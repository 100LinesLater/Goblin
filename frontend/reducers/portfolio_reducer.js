import { RECEIVE_PORTFOLIOS,
     RECEIVE_PORTFOLIO } from '../actions/transaction_actions';

const portfolioReducer = (oldState = [], action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_PORTFOLIOS:
            return action.portfolios;
        case RECEIVE_PORTFOLIO:
            const newState = oldState.slice();
            return newState.push(action.portfolio);
        default:
            return oldState;
    }
};

export default portfolioReducer;