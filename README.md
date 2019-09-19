# Goblin

Goblin is a Robinhood clone, a stock and equities trading platform that offers free trades on transactions. The app allows you to view stocks in your portfolio and other stocks on the market in different date ranges and keep track of the shares you own. 

[Live Site](https://goblin-project.herokuapp.com/#/home)

![Stock Page Image](public/stock-page-screenshot.png)

Goblin uses the following <b>technologies</b> in its implemenation:
* Database: Postgresql
* Backend: Rails
* Frontend: React / Redux
* Styling: SCSS, CSS

### Key Features

Stock Charts:

Building out graphs was a very rewarding part of this app. Being able to display stock charts is an important feature in any stock trading tool. 

Getting the stock data required fetching API on the relevant stock data. IEX was a great API resource for a variety of stock related information and pricing. Next, a graphing tool was needed to be able to plot the information. I used Recharts, a graphing tool for React in which you can supply the data you want the graph to be composed of. The array of objects was sent from the api call to the chart, choosing each day's closing price, and thus the graph was formed. 

One challenge in building this app was in getting the graphs to re-display with different ranges when clicking date tags. I had to find a way to get the component to update, but the page would then run my API call on every state change. To solve this issue, the api calls were repeated only if the previous state's interval differed from the current one. 

For the stock page in particular, more checks were made if the stock hadn't been viewed before and if a transaction was made. 

``` js
...
componentDidUpdate(_prevProps, prevState) {
    const {portfolioStock} = this.props;
    if (portfolioStock && portfolioStock.num_shares !== prevState.currentShares) {
        this.setState({ currentShares: portfolioStock.num_shares });
    } else if (!portfolioStock && prevState.currentShares) {
        this.setState({ currentShares: 0 });
    }
    if (!(this.props.ticker in this.props.stocks)) {
        createStock({ ticker: this.props.ticker });
        this.props.fetchStocks();
    }
    if (prevState.interval !== this.state.interval) {
        this.loadChartByInterval(this.state.interval, this.state.ticker);
    }
    if (_prevProps.ticker !== this.props.ticker) {
        fetchCurrentPrice(this.props.ticker).then(res => this.setState({ currentPrice: res, price: res }));
        this.loadChartByInterval(this.state.interval, this.props.ticker);
    }
}

onChangeInterval(value) {
    this.setState({interval: value});
}
...
```

Portfolio Graph:

The portfolio graph consisted of a few parts working one after the other. First, the transactions were acquired and then an array of the dates in the time period were created. API calls were made for every stock that appears in the transactions all over the same time period as the current interval. Going from transactions dated before the start of the interval to the end of the interval, transactions are logged with differences in stock amounts tallied and multiplied by the price at that date. The graph represents the total price of all the stocks in the portfolio for each day. 

``` js
...
fillPortfolioPriceData(txs) {
    const datesInRange = this.state.allTransactionStockChartData[0].data.map(
        data => data.date
    );

    const stockHash = {}; // ex: GOOG: 5, MSFT: 14
    let i = 0;
    
    return datesInRange.map((date, idx) => {
        let currPrice = 0;
        let dateInt = parseInt(date.split('-').join(''));

        while (i < txs.length && dateInt >= 
                parseInt(txs[i].transaction_date.split('-').join(''))) {
            if (stockHash.hasOwnProperty(txs[i].ticker)) {
                stockHash[txs[i].ticker] += txs[i].stock_difference;
            } else {
                stockHash[txs[i].ticker] = txs[i].stock_difference;
            }
            if (stockHash[txs[i].ticker] === 0) delete stockHash[txs[i].ticker];
            i++;
        }

        this.state.allTransactionStockChartData.forEach(stock => {
            if (stock.ticker in stockHash) {
                currPrice += stock.data[idx].close * stockHash[stock.ticker];
            }
        });

        return { date, close: currPrice };
    });
}
...
```

### Future Features:
* Supply stock info
* Account details, history, and settings