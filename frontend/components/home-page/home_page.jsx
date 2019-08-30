import React from 'react';
import { 
    fetchIntraday, 
    fetchChart,
    fetchChartWithoutChartInterval,
    } from '../../util/external_api_util';
import PortfolioChart from './portfolio-chart';
import PortfolioItem from './portfolio-item';
import WatchlistItem from './watchlist-item';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            price: 0,
            color: null,
            ticker: 'goog',
            interval: '3m',
            currentPrice: 10000,
            portfolioPriceData: [],
        };
    }

    componentDidMount() {
        this.props.fetchPortfolios();
        this.props.fetchWatchlists();
        this.props.fetchTransactions();
        this.props.fetchNews();
        // Delete fetchChart once transaction array is in place
        fetchChart(this.state.ticker, this.state.interval)
            .then(res => this.setState({ data: res }))
            .then(res => this.setState({
                color: [
                    (this.state.data[this.state.data.length - 1].close < this.state.data[0].close) ?
                        "#f1563a" : "#30cd9a"]
            }
            ));
    }

    componentDidUpdate(_prevProps, prevState) {
        const { transactions } = this.props;
        if (transactions.length > 0) {

        }
        // portfolio total price = last entry of portfolio chart
        if (prevState.interval !== this.state.interval) {
            // Delete fetchCharts once transaction data is in place
            if (this.state.interval === '1d') {
                fetchIntraday(this.state.ticker)
                    .then(res => this.setState({ data: res }))
                    .then(res => this.setState({
                        color: [
                            (this.state.data[this.state.data.length - 1].close < this.state.data[0].close) ?
                                "#f1563a" : "#30cd9a"]
                    }
                ));
            } else {
                fetchChart(this.state.ticker, this.state.interval)
                    .then(res => this.setState({ data: res }))
                    .then(res => this.setState({
                        color: [
                            (this.state.data[this.state.data.length - 1].close < this.state.data[0].close) ?
                                "#f1563a" : "#30cd9a"]
                    }
                ));
            }
        }
        
        // if (_prevProps.transactions && _prevProps.transactions.length > 0 &&
        //     _prevProps.transactions[_prevProps.transactions.length].created_at !== 
        //     this.props.transactions[this.props.transactions.length].created_at) {
        //          this.portfolioFormula();
        //     }
    }

    onChangeInterval(timeTag) {
        //Run portfolio formula and update data.
    }

    portfolioFormula() {
        const stockRecord = {}; // ex: GOOG: 5, MSFT: 14
        // const stocksInTransactions = new Set(
        //     this.props.transactions.map(tx => tx.ticker)
        // );
        let allTxStockChartData;
        //     = fillPortData(stocksInTransactions,
        //         this.state.interval
        // );
        const datesInRange = allTxStockChartData[0].data.map(
            data => data.transaction_date
        );
        const portfolioPriceData = fillPortfolioPriceData(
            this.props.transactions, datesInRange, allTxStockChartData, stockRecord
        );
        this.setState({portfolioPriceData});
    }

    // fillPortData (stocks, int) {
    //     async () => {
    //         const stockChartData = [];
    //         await Promise.all(() => {
    //             let promiseArr = [];
    //             stocks.forEach(stock =>
    //                 promiseArr.push(fetchChartWithoutChartInterval(stock, int)
    //                     .then(res => stockChartData.push({ 
    //                         ticker: stock, data: res 
    //                     })))
    //             );
    //             return promiseArr;
    //         });
    //         return stockChartData;
    //     }
    // }

    fillPortfolioPriceData(txs, dateRange, stockChartData, stockHash) {
        let i = 0;
        return dateRange.map((date, idx) => {
            let currPrice = 0;

            while (date === txs[i].transaction_date) {
                if (stockHash.hasOwnProperty(txs[i].ticker)) {
                    stockHash[txs[i].ticker] += txs[i].stock_diff;
                } else {
                    stockHash[txs[i].ticker] = txs[i].stock_diff;
                }
                if (stockHash[txs[i].ticker] === 0) delete stockHash[txs[i].ticker];
                i++;
            }

            stockChartData.forEach(stock => {
                if (stock.ticker in stockHash) {
                    currPrice += stock.data[idx].close * stockHash[stock.ticker];
                }
            });

            return { date, close: currPrice };
        });
    }

    renderArticles() {
        if (this.props.newsArticles) {
            return (
                <ul className="news-feed">
                {this.props.newsArticles.map((article, idx) => (
                    idx < 10 && !!article.multimedia[3] ? (
                        <a key={idx} className="news-line-item" href={article.url}>
                            <img className="news-photo" src={article.multimedia[3].url}></img>
                            <div className="news-content">
                                <p className="news-article-title">
                                    {article.title}
                                </p>
                                <p className="news-article-description">
                                    {article.abstract}
                                </p>
                            </div>
                        </a>
                    ) : <></>
                ))}
                </ul>
            )
        } 
        return "";
    }

    render() {
        return (
            <div className="home-page-main">

                <div className="portfolio-chart-main">
                    <div className="portfolio-chart-price">
                        <h1>${this.state.currentPrice.toFixed(2)}</h1>
                    </div>
                    <PortfolioChart className="portfolio-chart-chart"
                        data={this.state.data} 
                        color={this.state.color}
                    />
                    <div className="portfolio-chart-time-tags">
                        <li><a onClick={() => this.onChangeInterval('1m')}>{'1M'}</a></li>
                        <li><a onClick={() => this.onChangeInterval('3m')}>{'3M'}</a></li>
                        <li><a onClick={() => this.onChangeInterval('1y')}>{'1Y'}</a></li>
                    </div>
                </div>
                

                <div className="portfolio-sidebar-main">
                    <div className="portfolio-sidebar-title">
                        <p>Stocks</p>
                    </div>
                    {this.props.portfolios.filter( port => 
                        port.num_shares > 0
                    ).map( (port, idx) => {
                        return (
                            <PortfolioItem key={idx}
                            ticker={port.ticker}
                            num_shares={port.num_shares}
                            />
                        );
                    })}
                    <div className="portfolio-sidebar-title">
                        <p>Watchlist</p>
                    </div>
                    {this.props.watchlists.map( (watch, idx) => {
                        return (
                            <WatchlistItem key={idx}
                            ticker={watch.ticker}
                            />
                        );
                    })}
                </div>


                <div className="portfolio-news-main">
                    <h3 className="news-section-title">Recent News</h3>
                    {this.renderArticles()}
                </div>
            </div>
        )
    }
}

export default HomePage;