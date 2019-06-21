const pathStart = "https://cloud.iexapis.com/stable";
const testApiToken = "?token=Tpk_625a509013174c4790718b19cc9c7796";
const apiToken = "?token=pk_4b78e214d9484aafa8981ece2ba71449";
const pathStartWorld = "https://www.worldtradingdata.com/api/v1";
const worldApiToken = "hY9EnOWqeuof9zXhexjNSPdqBX3Gjhf7eT9v4lw3kxct6yLEHPIPTg9rfvn4";

// Stock Chart Data
export const fetchIntraday = (ticker, timeTag) => (
    $.ajax({
        method: 'GET',
        url: `${pathStart}/stock/${ticker}/intraday-prices${apiToken}&chartInterval=5`
    })
);

const intervalTable = {
    '1m': 1,
    '3m': 3,
    '1y': 10
};

export const fetchChart = (ticker, timeTag) => {
    return $.ajax({
        method: 'GET',
        url: `${pathStart}/stock/${ticker}/chart/${timeTag}/&chartInterval=${intervalTable(timeTag)}`
    });
};

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