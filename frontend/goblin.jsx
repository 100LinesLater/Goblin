import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

document.addEventListener("DOMContentLoaded", () => {
    const rootEl = document.getElementById('root');
    const store = configureStore();
    ReactDOM.render(<h2>Welcome to Goblin</h2>, rootEl);
    window.getState = store.getState;
    window.dispatch = store.dispatch;
});