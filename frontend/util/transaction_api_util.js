// Stocks
export const fetchStock = stock => (
    $.ajax({
        method: 'GET',
        url: `/api/stocks/${stock.id}`,
        data: { stock }
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
        method: 'UPDATE',
        url: `/api/portfolio/${portfolio.id}`,
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