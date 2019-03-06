import React from 'react';
import { fetchChart } from '../../util/external_api_util';
import PortfolioChart from './portfolio-chart';
import PortfolioStockChart from './portfolio-stock-chart';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            price: 0,
            color: null,
            numDays: 60,
            ticker: 'goog',
            interval: '3m'
        };
    }

    componentDidMount() {
        this.props.fetchPortfolios();
        this.props.fetchStocks();
        fetchChart(this.state.ticker, this.state.interval)
            .then(res => this.setState({ data: res }))
            .then(res => this.setState({
                color: [
                    (this.state.data[this.state.numDays - 1].close < this.state.data[0].close) ?
                        "#f1563a" : "#30cd9a"]
            }
            ));
    }

    render() {
        return (
            <div className="home-page-main">
                <div className="portfolio-chart-main">
                    <div className="portfolio-chart-price">
                        <h1>{'$50.31'}</h1>
                        <h3>{'+$2.05 (3.98%)'}</h3>
                    </div>
                    <PortfolioChart className="portfolio-chart-chart"
                        data={this.state.data} 
                        color={this.state.color}
                    />
                    <ul className="portfolio-chart-time-tags">
                        <a>{'1M'}</a>
                        <a>{'3M'}</a>
                        <a>{'6M'}</a>
                        <a>{'1Y'}</a>
                    </ul>
                </div>
                
                <div className="portfolio-sidebar-main">
                    <div className="portfolio-sidebar-title">
                        <p>Stocks</p>
                    </div>
                    {this.props.portfolios.filter( port => 
                        port.num_shares > 0
                    ).map( (port, idx) => {
                        return (
                        <a className="portfolio-stock-entry"
                        href={`/stocks/${port.ticker}`}
                        key={idx}
                        >
                            <div className="portfolio-stock-and-shares">
                                    <p className="p1">{port.ticker}</p>  
                                <p className="p2">{`${port.num_shares} shares`}</p>
                            </div>
                            <div className="portfolio-stock-daily-chart">
                                <PortfolioStockChart 
                                ticker={port.ticker}

                                />
                            </div>
                            <div className="portfolio-stock-price">
                                {`$50.${51 + idx}`}
                            </div>
                        </a>
                        );
                        //clickable a tag. 
                        //Get stock name from portfolio entry through stocks table
                        //Get num shares from port. Get daily graph through api call
                        //Ask how to get entities state to look like sample state.
                        //Maybe user_id: [{user_id, stock_id, num_shares},
                        //                {user_id, stock_id, num_shares}]
                    })
                    }
                </div>
            </div>
        )
    }
}

export default HomePage;