import {combineReducers} from 'redux';
import newsArticlesReducer from './news_articles_reducer';
import portfolioReducer from './portfolio_reducer';
import stockDataReducer from './stockDataReducer';
import stockReducer from './stock_reducer';
import transactionReducer from './transaction_reducer';
import usersReducer from './users_reducer';
import watchlistReducer from './watchlist_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: stockReducer, 
    portfolios: portfolioReducer, 
    transactions: transactionReducer,
    watchlists: watchlistReducer,
    news: newsArticlesReducer,
    stockData: stockDataReducer
});

export default entitiesReducer;