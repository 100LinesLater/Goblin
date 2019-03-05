import {combineReducers} from 'redux';
import usersReducer from './users_reducer';
import stockReducer from './stock_reducer';
import portfolioReducer from './portfolio_reducer';
import transactionReducer from './transaction_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: stockReducer, 
    portfolios: portfolioReducer, 
    transactions: transactionReducer,
});

export default entitiesReducer;