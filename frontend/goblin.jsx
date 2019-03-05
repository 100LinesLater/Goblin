import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as util from './util/external_api_util';
import * as transactionUtil from './util/transaction_api_util';

document.addEventListener("DOMContentLoaded", () => {
    const rootEl = document.getElementById('root');

    // Test
        window.fetchChart = util.fetchChart;
        window.fetchChartWithDate = util.fetchChartWithDate;

        window.fetchStock = transactionUtil.fetchStock;
        window.createStock = transactionUtil.createStock;
        window.createPortfolio = transactionUtil.createPortfolio;
        window.fetchPortfolios = transactionUtil.fetchPortfolios;
    // End Test

    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { 
                    [window.currentUser.id]: window.currentUser
                }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    
    ReactDOM.render(<Root store={store} />, rootEl);
});