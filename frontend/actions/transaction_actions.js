import * as transactionUtil from '../util/transaction_api_util';

export const RECEIVE_STOCKS = "RECEIVE_STOCKS";
export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const RECEIVE_PORTFOLIOS = "RECEIVE_PORTFOLIOS";
export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";
export const RECEIVE_TRANSACTIONS = "RECEIVE_TRANSACTIONS";
export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const RECEIVE_WATCHLISTS = "RECEIVE_WATCHLISTS";
export const RECEIVE_WATCHLIST = "RECEIVE_WATCHLIST";

const receiveStocks = stocks => ({
    type: RECEIVE_STOCKS,
    stocks
});

const receiveStock = stock => ({
    type: RECEIVE_STOCK,
    stock
});

const receivePortfolios = portfolios => ({
    type: RECEIVE_PORTFOLIOS,
    portfolios
});

const receivePortfolio = portfolio => ({
    type: RECEIVE_PORTFOLIO,
    portfolio
});

const receiveTransactions = transactions => ({
    type: RECEIVE_TRANSACTIONS,
    transactions
});

const receiveTransaction = transaction => ({
    type: RECEIVE_TRANSACTION,
    transaction
});

const receiveWatchlists = watchlists => ({
    type: RECEIVE_WATCHLISTS,
    watchlists,
});

const receiveWatchlist = watchlist => ({
    type: RECEIVE_WATCHLIST,
    watchlist,
});

export const fetchStocks = () => dispatch => (
    transactionUtil.fetchStocks()
        .then(stocks => dispatch(receiveStocks(stocks)))
);

export const createStock = (stock) => dispatch => (
    transactionUtil.createStock(stock)
        .then(stock => dispatch(receiveStock(stock)))
);

export const fetchPortfolios = () => dispatch => (
    transactionUtil.fetchPortfolios()
        .then(ports => dispatch(receivePortfolios(ports)))
);

export const createPortfolio = (port) => dispatch => (
    transactionUtil.createPortfolio(port)
        .then(port => dispatch(receivePortfolio(port)))
);

export const updatePortfolio = (port) => dispatch => (
    transactionUtil.updatePortfolio(port)
        .then(port => dispatch(receivePortfolio(port)))
);

export const fetchTransactions = () => dispatch => (
    transactionUtil.fetchTransactions()
        .then(txs => dispatch(receiveTransactions(txs)))
);

export const createTransaction = (tx) => dispatch => (
    transactionUtil.createTransaction(tx)
        .then(tx => dispatch(receiveTransaction(tx)))
);

export const fetchWatchlists = () => dispatch => (
    transactionUtil.fetchWatchlists()
        .then(watch => dispatch(receiveWatchlists(watch)))
);

export const createWatchlist = watch => dispatch => (
    transactionUtil.createWatchlist(watch)
        .then(watch => dispatch(receiveWatchlist(watch)))
);

export const removeWatchlist = watch => dispatch => (
    transactionUtil.deleteWatchlist(watch)
        .then(watch => dispatch(receiveWatchlist(watch)))
);