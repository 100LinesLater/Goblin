const pathStart = "https://api.iextrading.com/1.0";
const pathStartWorld = "https://www.worldtradingdata.com/api/v1";
const apiToken = "hY9EnOWqeuof9zXhexjNSPdqBX3Gjhf7eT9v4lw3kxct6yLEHPIPTg9rfvn4";

// Stock Chart Data 
export const fetchDailyChart = (ticker) => (
    $.ajax({
        method: 'GET',
        url: `${pathStartWorld}/intraday?symbol=${ticker}&range=1&interval=5&api_token=${apiToken}`
    })
);
export const fetchWeeklyChart = (ticker) => (
    $.ajax({
        method: 'GET',
        url: `${pathStartWorld}/intraday?symbol=${ticker}&range=7&interval=30&api_token=${apiToken}`
    })
);
export const fetchHistoricalChart = (ticker) => (
    $.ajax({
        method: 'GET',
        url: `${pathStartWorld}/history?symbol=${ticker}&date_from=2018-01-01&date_to=2019-12-31&sort=newest&api_token=${apiToken}`
    })
);

export const fetchChart = (ticker, timeTag) => (
    $.ajax({
        method: 'GET',
        url: `${pathStart}/stock/${ticker}/chart/${timeTag}`
    })
);
// date = YYYYMMDD
export const fetchChartWithDate = (ticker, date) => (
    $.ajax({
        method: 'GET',
        url: `${pathStart}/stock/${ticker}/chart/date/${date}`
    })
);
export const fetchCurrentPrice = (ticker) => (
    $.ajax({
        method: 'GET',
        url: `${pathStart}/stock/${ticker}/price`
    })
);
// Finance News
export const fetchNews = () => (
    $.ajax({
        method: 'GET',
        url: `https://api.nytimes.com/svc/topstories/v2/business.json?api-key=x5PS4SPXYOBKxxOs6SDQvLJqpvqzxm8x`
    })
);

// Search
export const fetchSearchResults = (term) => (
    $.ajax({
        method: 'GET',
        url: `${pathStartWorld}/stock_search?search_term=${term}&limit=5&page=1&api_token=${apiToken}`
    })
);

