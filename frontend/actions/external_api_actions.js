import * as externalAPIUtil from '../util/external_api_util';

export const RECEIVE_CHART_DATA = "RECEIVE_CHART_DATA";
export const RECEIVE_DAILY_CHART_DATA = "RECEIVE_DAILY_CHART_DATA";
export const RECEIVE_WEEKLY_CHART_DATA = "RECEIVE_WEEKLY_CHART_DATA";
export const RECEIVE_HISTORICAL_CHART_DATA = "RECEIVE_HISTORICAL_CHART_DATA";
export const RECEIVE_NEWS = "RECEIVE_NEWS";

const receiveDailyChartData = data => ({
    type: RECEIVE_DAILY_CHART_DATA,
    data
});

const receiveWeeklyChartData = data => ({
    type: RECEIVE_WEEKLY_CHART_DATA,
    data
});

const receiveHistoricalChartData = data => ({
    type: RECEIVE_HISTORICAL_CHART_DATA,
    data
});

const receiveChartData = data => ({
    type: RECEIVE_CHART_DATA,
    data
});

const receiveNews = news => ({
    type: RECEIVE_NEWS,
    news
});

export const getDailyChart = (ticker) => dispatch => (
    externalAPIUtil.fetchDailyChart(ticker)
        .then(res => dispatch(receiveDailyChartData(res.intraday)))
);

export const getWeeklyChart = (ticker) => dispatch => (
    externalAPIUtil.fetchWeeklyChart(ticker)
        .then(res => dispatch(receiveWeeklyChartData(res.intraday)))
);

export const getHistoricalChart = (ticker) => dispatch => (
    externalAPIUtil.fetchHistoricalChart(ticker)
        .then(res => dispatch(receiveHistoricalChartData(res.history)))
);

export const getChartDataWithTag = (ticker, timeTag) => dispatch => (
    externalAPIUtil.fetchChart(ticker, timeTag)
        .then(res => dispatch(receiveChartData(res)))
);

export const fetchNews = () => dispatch => (
    externalAPIUtil.fetchNews()
        .then(res => dispatch(receiveNews(res.results)))
);