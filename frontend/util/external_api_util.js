const pathStart = "https://api.iextrading.com/1.0";
const apiToken = "";
const pathStartWorld = "https://www.worldtradingdata.com/api/v1";
const worldApiToken = "hY9EnOWqeuof9zXhexjNSPdqBX3Gjhf7eT9v4lw3kxct6yLEHPIPTg9rfvn4";

// Stock Chart Data
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
        url: `${pathStartWorld}/stock_search?search_term=${term}&limit=5&page=1&api_token=${worldApiToken}`
    })
);