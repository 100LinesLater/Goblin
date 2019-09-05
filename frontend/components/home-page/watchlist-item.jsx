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
    return (
      <NavLink className="portfolio-stock-entry"
        to={`/stocks/${this.props.ticker}`}
      >
        <p className="w">{this.props.ticker}</p>
        <div className="portfolio-stock-daily-chart">
          {/* <PortfolioStockChart
                        ticker={this.props.ticker}
                    /> */} Stock Chart Here
                </div>
        <div className="portfolio-stock-price">
          {`$${this.state.currentPrice.toFixed(2)}`}
        </div>
      </NavLink>
    );
  }
}

export default WatchlistItem;