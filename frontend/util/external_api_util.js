const pathStart = "https://api.iextrading.com/1.0";

// Stock Chart Data 
// Tags: 1d, 1m, 3m, 1y, 5y
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
        url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=f5b8533f8aaf4c5d93b5668c4fec1a28`
    })
);

// Stock Info
