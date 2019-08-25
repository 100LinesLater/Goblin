import React from 'react';
import {NavLink} from 'react-router-dom';

class SearchFilterItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <NavLink className="search-filter-item"
        to={`/stocks/${this.props.ticker}`}
        onClick={this.props.reset}>
        <p>{this.props.ticker}</p>
        <p>{this.props.exchange}</p>
        {/* <p className="searchFilterItemSymbol">{this.props.ticker}</p> */}
      </NavLink>
    )
  }
}

export default SearchFilterItem;