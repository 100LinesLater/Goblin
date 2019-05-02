import {
  RECEIVE_HISTORICAL_CHART_DATA
} from '../actions/external_api_actions';

const stockDataReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_HISTORICAL_CHART_DATA:
      return action.data;
    default:
      return oldState;
  }
};

export default stockDataReducer;