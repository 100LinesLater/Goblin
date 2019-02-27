import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener("DOMContentLoaded", () => {
    const rootEl = document.getElementById('root');
    const store = configureStore();
    // Testing Start
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // Testing End
    ReactDOM.render(<Root store={store} />, rootEl);
});