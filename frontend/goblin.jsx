import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import {fetchStocks} from './util/transaction_api_util';

document.addEventListener("DOMContentLoaded", () => {
    const rootEl = document.getElementById('root');

    // Test
        window.fetchStocks = fetchStocks;
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