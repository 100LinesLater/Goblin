import * as externalAPIUtil from '../util/external_api_util';

export const RECEIVE_CHART_DATA = "RECEIVE_CHART_DATA";
export const RECEIVE_NEWS = "RECEIVE_NEWS";

const receiveChartData = data => ({
    type: RECEIVE_CHART_DATA,
    data
});

const receiveNews = news => ({
    type: RECEIVE_NEWS,
    news
});

export const getChartDataWithTag = (ticker, timeTag) => dispatch => (
    externalAPIUtil.fetchChart(ticker, timeTag)
        .then(res => dispatch(receiveChartData(res)))
);

export const fetchNews = () => dispatch => (
    externalAPIUtil.fetchNews()
        .then(res => dispatch(receiveNews(res.results)))
);