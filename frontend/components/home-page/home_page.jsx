import React from 'react';
import { fetchChart } from '../../util/external_api_util';
import PortfolioChart from './portfolio-chart';
import PortfolioItem from './portfolio-item';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            newsData: null,
            price: 0,
            color: null,
            ticker: 'goog',
            interval: '3m',
            currentPrice: 0
        };
    }

    componentDidMount() {
        this.props.fetchPortfolios();
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
                        <li><a onClick={() => this.onChangeInterval('1D')}>{'1D'}</a></li>
                        <li><a onClick={() => this.onChangeInterval('1M')}>{'1M'}</a></li>
                        <li><a onClick={() => this.onChangeInterval('3M')}>{'3M'}</a></li>
                        <li><a onClick={() => this.onChangeInterval('1Y')}>{'1Y'}</a></li>
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
                    })
                    }
                </div>


                <div className="portfolio-news-main">
                    <h3 className="news-section-title">Recent News</h3>
                    <ul className="news-feed">
                        {this.props.newsArticles.map( (article, idx) => {
                            return (
                            <a key={idx} className="news-line-item" href={article.url}>
                                <img className="news-photo" src={article.urlToImage}></img>
                                <div className="news-content">
                                    <p className="news-article-title">
                                        {article.title}
                                    </p>
                                    <p className="news-article-description">
                                        {article.description}
                                    </p>
                                </div>
                            </a>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default HomePage;