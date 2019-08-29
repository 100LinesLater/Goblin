import React from 'react';
import { fetchChart, fetchIntraday } from '../../util/external_api_util';
import PortfolioChart from '../home-page/portfolio-chart';
import {fetchCurrentPrice} from '../../util/external_api_util';
import {createStock, updatePortfolio, 
        createPortfolio, createTransaction,
        } from '../../util/transaction_api_util';

class StockPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            price: 0,
            color: null,
            ticker: this.props.ticker,
            interval: '1y',
            buySellStockAmt: 0,
            currentPrice: 0,
            currentShares: 0,
            buyOption: true,
            chartToolPrice: 0,
            watchlistExists: false,
        };
        this.priceChange = this.priceChange.bind(this);
        this.addRemoveWatchlist = this.addRemoveWatchlist.bind(this);
        this.removeWatchlist = this.removeWatchlist.bind(this);
        this.addWatchlist = this.addWatchlist.bind(this);
    }

    componentDidMount() {
        this.props.fetchPortfolios();
        this.props.fetchNews();
        this.props.fetchStocks();
        this.props.fetchWatchlists()
            .then(res => {
                if (res.watchlists.find(watch => 
                    watch.ticker === this.props.ticker) !== undefined) {
                    this.setState({watchlistExists: true});
                } else {
                    this.setState({watchlistExists: false});
                }
            });
        fetchCurrentPrice(this.state.ticker).then(res => this.setState({currentPrice: res, price: res}));
        this.fetchChartNormal(this.state.ticker, this.state.interval);
    }

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

    loadChartByInterval(interval, ticker) {
        if (interval === '1d') {
            this.fetchChartDaily(ticker);
        } else {
            this.fetchChartNormal(ticker, interval);
        }
    }

    fetchChartDaily(ticker) {
        fetchIntraday(ticker)
            .then(res => this.setState({ data: res }))
            .then(res => this.setState({
                color: [
                    (this.state.data[this.state.data.length - 1].close < this.state.data[0].close) ?
                        "#f1563a" : "#30cd9a"]
            }
            ));
    }

    fetchChartNormal(ticker, interval) {
        fetchChart(ticker, interval)
            .then(res => this.setState({ data: res }))
            .then(res => this.setState({
                color: [
                    (this.state.data[this.state.data.length - 1].close < this.state.data[0].close) ?
                        "#f1563a" : "#30cd9a"]
            }
            ));
    }

    onInputChange() {
        return e => {
            this.setState({buySellStockAmt: parseInt(e.currentTarget.value)});
            this.setState({price: e.currentTarget.value * this.state.currentPrice});
        };
    }

    buySellOptionChange(bool) {
        this.setState({buyOption: bool});
    }

    placeOrder() {
        const {currentUser, portfolioStock, stocks} = this.props;
        const {buySellStockAmt, currentShares, ticker} = this.state;
        if (this.state.buyOption) {
            if (this.state.price <= currentUser.buying_power && 
                buySellStockAmt > 0) {
                if (currentShares) {
                    const numShares = currentShares + buySellStockAmt;
                    this.updatePort(
                        currentUser.id,
                        portfolioStock.stock_id,
                        numShares
                    );
                } else {
                    createPortfolio({
                      user_id: currentUser.id,
                      stock_id: stocks[ticker].id,
                      num_shares: buySellStockAmt,
                    });
                }
                this.createTx(
                  currentUser.id,
                  portfolioStock.stock_id,
                  buySellStockAmt
                );
                let user = currentUser;
                user.buying_power -= this.state.price;
                this.props.updateUser(user);
            }
        } else {
            if (buySellStockAmt > 0 && buySellStockAmt <= currentShares) {
                const numShares = currentShares - buySellStockAmt;
                this.updatePort(
                    currentUser.id,
                    portfolioStock.stock_id,
                    numShares
                );
                this.createTx(
                    currentUser.id,
                    portfolioStock.stock_id,
                    -buySellStockAmt
                );
                let user = currentUser;
                user.buying_power += this.state.price;
                this.props.updateUser(user);
            }
        }
    }

    updatePort(userId, stockId, numShares) {
        updatePortfolio({
            user_id: userId,
            stock_id: stockId,
            num_shares: numShares,
        });
    }

    createTx(userId, stockId, stockDiff) {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = '' + yyyy + '-' + mm + '-' + dd;

        createTransaction({
            user_id: userId,
            stock_id: stockId,
            stock_difference: stockDiff,
            transaction_date: today,
        });
    }

    addRemoveWatchlist() {
        if (!this.state.watchlistExists) {
            this.addWatchlist();
                
        } else {
            const watchlist = this.props.watchlists.find(w => 
                w.ticker === this.props.ticker
            );
            this.removeWatchlist(watchlist);
        }
    }

    addWatchlist() {
        const {stocks, ticker, currentUser} = this.props;
        this.props.createWatchlist({
            stock_id: stocks[ticker].id,
            user_id: currentUser.id,
            ticker,
        });
        this.setState({watchlistExists: true});
    }

    removeWatchlist(watchlist) {
        this.props.removeWatchlist(watchlist);
        this.setState({watchlistExists: false});
    }

    priceChange(price) {
        this.setState({chartToolPrice: price});
    }

    render() {
        const marketPriceStyle = {
            color: this.state.color
        };
        const borderColor = {
            border: `1.5px solid ${this.state.color}`, color: this.state.color
        };
        return (
            <div className="home-page-main">

                <div className="portfolio-chart-main">
                    <div className="portfolio-chart-price">
                        <h1>${(this.state.chartToolPrice ||
                            this.state.currentPrice).toFixed(2)}</h1>
                    </div>
                    <PortfolioChart className="portfolio-chart-chart"
                        data={this.state.data}
                        color={this.state.color}
                        interval={this.state.interval}
                        // priceChange={this.priceChange}
                    />
                    <div className="stock-chart-time-tags">
                        <li><a onClick={() => this.onChangeInterval('1d')}>{'1D'}</a></li>
                        <li><a onClick={() => this.onChangeInterval('1m')}>{'1M'}</a></li>
                        <li><a onClick={() => this.onChangeInterval('3m')}>{'3M'}</a></li>
                        <li><a onClick={() => this.onChangeInterval('1y')}>{'1Y'}</a></li>
                    </div>
                </div>


                <div className="stock-sidebar-main">
                    <div className="buy-sell-option">
                        <p className="buy-word"
                            onClick={() => this.buySellOptionChange(true)}
                            >Buy {this.props.ticker}
                        </p>
                        <p className="sell-word"
                            onClick={() => this.buySellOptionChange(false)}
                            >Sell {this.props.ticker}
                        </p>
                    </div>
                    <div className="stock-shares-input">
                        <label>{this.state.buyOption ? "Buy" : "Sell"} Shares
                            <input 
                            type="number"
                            value={this.state.buySellStockAmt}
                            min-value={1}
                            onChange={this.onInputChange()}
                            />
                        </label>
                    </div>
                    <div className="stock-market-price">
                        <p className="market-price-word" style={marketPriceStyle}>Market Price</p>
                        <p className="market-price-price">{`$${this.state.currentPrice.toFixed(2)}`}</p>
                    </div>
                    <div className="estimated-cost">
                        <p className="estimated-cost-word">Estimated Cost</p>
                        <p className="estimated-cost-cost">
                            {`$${(this.state.buySellStockAmt > 0 
                            ? this.state.buySellStockAmt * this.state.currentPrice
                            : 0).toFixed(2)}`}</p>
                    </div>
                    <button className="place-order-btn"
                        onClick={() => this.placeOrder()}
                    >Place Order</button>
                    <p className="buying-power">Buying Power: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    ${this.props.currentUser.buying_power.toFixed(2)}</p>
                </div>

                <div className="watchlist-add-remove">
                    <button className="watchlist-add-remove-btn" 
                    style={borderColor}
                    onClick={this.addRemoveWatchlist}
                    >
                        {this.state.watchlistExists ? "Remove from" :
                        "Add to"} Watchlist
                    </button>
                </div>

                <div className="portfolio-news-main">
                    <h3 className="news-section-title">Recent News</h3>
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
                </div>
            </div>
        )
    }
}

export default StockPage;