import React from 'react';
import {NavLink} from 'react-router-dom';

class SearchFilterItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    const {name, exchange, ticker} = this.props;
    return (
      <NavLink
        className="search-filter-item"
        to={`/stocks/${this.props.ticker}`}
        onClick={this.props.reset}>
        <p>
          {ticker + ' : ' + (name.length > 12
            ? name.slice(0, 12) + '...'
            : name)}
        </p>
        <p>{exchange}</p>
        {/* <p className="searchFilterItemSymbol">{this.props.ticker}</p> */}
      </NavLink>
    );
  }
}

export default SearchFilterItem;