import {
  RECEIVE_WATCHLISTS,
  RECEIVE_WATCHLIST, 
  REMOVE_WATCHLIST,
} from '../actions/transaction_actions';

const watchlistReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_WATCHLISTS:
      return action.watchlists;
    case RECEIVE_WATCHLIST:
      const newState = oldState.slice();
      newState.push(action.watchlist);
      return newState;
    case REMOVE_WATCHLIST:
      const newSt = oldState.filter(watch => action.watchlist.ticker !== watch.ticker);
      return newSt;
    default:
      return oldState;
  }
};

export default watchlistReducer;