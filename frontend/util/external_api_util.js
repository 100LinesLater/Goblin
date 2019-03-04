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

// Finance News
export const fetchGeneralNews = () => (
    $.ajax({
        method: 'GET',
        url: `${pathStart}/stock/market/news/last/10`
    })
);
export const fetchStockNews = (ticker) => (
    $.ajax({
        method: 'GET',
        url: `${pathStart}/stock/${ticker}/news/last/10`
    })
);

// Stock Info
