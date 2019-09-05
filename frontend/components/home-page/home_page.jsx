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
            color: null,
            interval: '1m',
            currentPrice: 10000,
            stocksInTransactions: {},
            allTransactionStockChartData: [],
            portfolioPriceData: [],
        };
    }

    componentDidMount() {
        this.props.fetchPortfolios();
        this.props.fetchWatchlists();
        this.props.fetchTransactions();
        this.props.fetchNews();
    }

    componentDidUpdate(_prevProps, prevState) {
        const { transactions } = this.props;
        const { allTransactionStockChartData, 
            stocksInTransactions, portfolioPriceData} = this.state;
        if (transactions.length && _prevProps.transactions.length !== transactions.length) {
            this.portfolioSetup();
        }
        if (allTransactionStockChartData.length && 
            allTransactionStockChartData.length === stocksInTransactions.size &&
            prevState.allTransactionStockChartData.length === stocksInTransactions.size - 1) {
                this.setState({
                    portfolioPriceData: this.fillPortfolioPriceData(transactions)
                });
        }
        if (portfolioPriceData.length &&
            portfolioPriceData.length !== prevState.portfolioPriceData.length) {
            this.setState({
                color: [
                (portfolioPriceData[portfolioPriceData.length - 1].close < 
                    portfolioPriceData[0].close) ?
                        "#f1563a" : "#30cd9a"
                ], 
                currentPrice: portfolioPriceData[portfolioPriceData.length - 1].close
            });
        }
        if (prevState.interval !== this.state.interval) {
            this.setState({
                allTransactionStockChartData: [],
                portfolioPriceData: [],
            });
            this.portfolioSetup();
        }
    }

    onChangeInterval(timeTag) {
        this.setState({interval: timeTag});
    }

    portfolioSetup() {
        let stocksInTransactions = new Set(
            this.props.transactions.map(tx => tx.ticker)
        );
        this.setState({stocksInTransactions});
        stocksInTransactions.forEach(stock =>
            fetchChartWithoutChartInterval(stock, this.state.interval)
                .then(res => this.setState({ allTransactionStockChartData:
                    [...this.state.allTransactionStockChartData, 
                        { ticker: stock, data: res}]
                }))
        );
    }

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
        const {portfolios, watchlists} = this.props;
        const {currentPrice, portfolioPriceData, color} = this.state;
        return (
            <div className="home-page-main">

                <div className="portfolio-chart-main">
                    <div className="portfolio-chart-price">
                        <h1>${currentPrice.toFixed(2)}</h1>
                    </div>
                    <PortfolioChart className="portfolio-chart-chart"
                        data={portfolioPriceData} 
                        color={color}
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
                    {portfolios.filter( port => 
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
                    {watchlists.map( (watch, idx) => {
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