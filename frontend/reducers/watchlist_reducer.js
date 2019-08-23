import {
  RECEIVE_WATCHLISTS,
  RECEIVE_WATCHLIST
} from '../actions/transaction_actions';

const watchlistReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_WATCHLISTS:
      return action.watchlists;
    case RECEIVE_WATCHLIST:
      const newState = oldState.slice();
      return newState.push(action.watchlist);
    default:
      return oldState;
  }
};

export default watchlistReducer;