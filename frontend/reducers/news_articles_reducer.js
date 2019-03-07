import {
    RECEIVE_NEWS
} from '../actions/external_api_actions';

const newsArticlesReducer = (oldState = [], action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_NEWS:
            return action.news;
        default:
            return oldState;
    }
};

export default newsArticlesReducer;