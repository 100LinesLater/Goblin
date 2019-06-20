import {combineReducers} from 'redux';
import usersReducer from './users_reducer';
import stockReducer from './stock_reducer';
import portfolioReducer from './portfolio_reducer';
import transactionReducer from './transaction_reducer';
import newsArticlesReducer from './news_articles_reducer';
import stockDataReducer from './stockDataReducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: stockReducer, 
    portfolios: portfolioReducer, 
    transactions: transactionReducer,
    news: newsArticlesReducer,
    stockData: stockDataReducer
});

export default entitiesReducer;