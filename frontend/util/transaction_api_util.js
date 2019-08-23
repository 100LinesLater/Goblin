// Stocks
export const fetchStocks = () => (
    $.ajax({
        method: 'GET',
        url: `/api/stocks`,
    })
);
export const createStock = stock => (
    $.ajax({
        method: 'POST',
        url: `/api/stocks`,
        data: { stock }
    })
);

//Portfolios
export const fetchPortfolios = () => (
    $.ajax({
        method: 'GET',
        url: `/api/portfolios`
    })
);
export const createPortfolio = portfolio => (
    $.ajax({
        method: 'POST',
        url: `/api/portfolios`,
        data: {portfolio}
    })
);
export const updatePortfolio = portfolio => (
    $.ajax({
        method: 'PATCH',
        url: `/api/portfolios/${portfolio.id}`,
        data: {portfolio}
    })
);

//Transactions
export const fetchTransactions = () => (
    $.ajax({
        method: 'GET',
        url: `/api/transactions`
    })
);
export const createTransaction = transaction => (
    $.ajax({
        method: 'POST',
        url: `/api/transactions`,
        data: { transaction }
    })
);

//Watchlists
export const fetchWatchlists = () => (
    $.ajax({
        method: 'GET',
        url: `/api/watchlists`,
    })
);

export const createWatchlist = watchlist => (
    $.ajax({
        method: 'POST',
        url: `/api/watchlists`,
        data: { watchlist }
    })
);

export const deleteWatchlist = watchlist => (
    $.ajax({
        method: 'DELETE',
        url: `/api/watchlists/${watchlist}`,
        data: { watchlist }
    })
);