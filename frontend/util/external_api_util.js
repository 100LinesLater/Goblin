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
        url: `https://api.nytimes.com/svc/topstories/v2/business.json?api-key=x5PS4SPXYOBKxxOs6SDQvLJqpvqzxm8x`
    })
);

// Stock Info
