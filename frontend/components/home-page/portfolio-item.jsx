import React from 'react';
import { NavLink } from 'react-router-dom';
import {fetchCurrentPrice} from '../../util/external_api_util';
import PortfolioStockChart from './portfolio-stock-chart';

class PortfolioItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPrice: null,
        };
    }

    componentDidMount() {
        fetchCurrentPrice(this.props.ticker)
            .then(res => this.setState({currentPrice: res}));
    }

    render() { 
        return (
            <NavLink className="portfolio-stock-entry"
                to={`/stocks/${this.props.ticker}`}
            >
                <div className="portfolio-stock-and-shares">
                    <p className="p1">{this.props.ticker}</p>
                    <p className="p2">{`${this.props.num_shares} shares`}</p>
                </div>
                <div className="portfolio-stock-daily-chart">
                    <PortfolioStockChart
                        ticker={this.props.ticker}
                    />
                </div>
                <div className="portfolio-stock-price">
                    {`$${this.state.currentPrice}`}
                </div>
            </NavLink>
        );
    }
}

export default PortfolioItem;