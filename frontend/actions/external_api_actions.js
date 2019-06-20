import * as externalAPIUtil from '../util/external_api_util';

export const RECEIVE_CHART_DATA = "RECEIVE_CHART_DATA";
export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";
export const RECEIVE_NEWS = "RECEIVE_NEWS";

const receiveChartData = data => ({
    type: RECEIVE_CHART_DATA,
    data
});

const receiveSearchResults = results => ({
    type: RECEIVE_SEARCH_RESULTS, 
    results
});

const receiveNews = news => ({
    type: RECEIVE_NEWS,
    news
});

export const getChartDataWithTag = (ticker, timeTag) => dispatch => (
    externalAPIUtil.fetchChart(ticker, timeTag)
        .then(res => dispatch(receiveChartData(res)))
);

export const getSearchResults = (searchTerm) => dispatch => (
    externalAPIUtil.fetchSearchResults(searchTerm)
        .then(res => dispatch(receiveSearchResults(res.data)))
);

export const fetchNews = () => dispatch => (
    externalAPIUtil.fetchNews()
        .then(res => dispatch(receiveNews(res.results)))
);