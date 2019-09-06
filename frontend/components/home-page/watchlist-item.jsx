import React from 'react';
import { NavLink } from 'react-router-dom';
import { fetchCurrentPrice } from '../../util/external_api_util';
import PortfolioStockChart from './portfolio-stock-chart';

class WatchlistItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: 0,
    };
  }

  componentDidMount() {
    fetchCurrentPrice(this.props.ticker)
      .then(res => this.setState({ currentPrice: res }));
  }

  render() {
    const {data, ticker} = this.props;
    const color = data ? (data[0].close > data[data.length - 1].close ? 
      '#f1563a' : '#30cd9a') : null;
    return (
      <NavLink className="portfolio-stock-entry"
        to={`/stocks/${ticker}`}
      >
        <p className="w">{ticker}</p>
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

export default WatchlistItem;