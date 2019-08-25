import React from 'react';
import { fetchIntraday, fetchChart } from '../../util/external_api_util';
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
        };
    }

    componentDidMount() {
        this.props.fetchPortfolios();
        this.props.fetchWatchlists();
        this.props.fetchNews();
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
        if (prevState.interval !== this.state.interval) {
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
                        <li><a onClick={() => this.onChangeInterval('1d')}>{'1D'}</a></li>
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