import React from 'react';
import { NavLink } from 'react-router-dom';
import {fetchCurrentPrice} from '../../util/external_api_util';
import PortfolioStockChart from './portfolio-stock-chart';

class PortfolioItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPrice: 0,
        };
    }

    componentDidMount() {
        fetchCurrentPrice(this.props.ticker)
            .then(res => this.setState({currentPrice: res}));
    }

    render() { 
        const {data, ticker, num_shares} = this.props;
        const color = data ? (data[0].close > data[data.length - 1].close ? 
            '#f1563a' : '#30cd9a') : null;
        return (
            <NavLink className="portfolio-stock-entry"
                to={`/stocks/${ticker}`}
            >
                <div className="portfolio-stock-and-shares">
                    <p className="p1">{ticker}</p>
                    <p className="p2">{`${num_shares} shares`}</p>
                </div>
                <div className="portfolio-stock-daily-chart">
                    {data ?
                    (<PortfolioStockChart
                        data={data}
                        color={color}
                    />) : ("")}
                </div>
                <div className="portfolio-stock-price">
                    {`$${this.state.currentPrice.toFixed(2)}`}
                </div>
            </NavLink>
        );
    }
}

export default PortfolioItem;