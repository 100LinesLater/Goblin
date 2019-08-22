import React from 'react';
import {NavLink} from 'react-router-dom';
import {fetchSearchResults} from '../../util/external_api_util';
import SearchFilterItem from './search_filter_item';

// fetchSearchResults("goog")
//     .then(res => console.log(res.data[0].symbol));

class Header extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            searchResults: [],
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        e.preventDefault();
        this.setState({ searchTerm: e.target.value });
        if (e.target.value !== "") {
            fetchSearchResults(e.target.value)
                .then(res => this.setState({searchResults: res.data}))
                .then(res => this.setState());
        }
    }
    
    render() {
        return (
          <div className="nav-bar">
            <NavLink className="logo-top" to="/" />
            <div className="stock-search">
              <div className="stock-search-bar">
                <span className="fa fa-search" />
                <input
                  className="search-bar-input"
                  type="text"
                  onChange={this.handleInputChange}
                  placeholder="Search"
                />
              </div>
              {this.state.searchResults.length ? (
                <ul className="search-filter">
                  {this.state.searchResults.map((item, idx) => (
                    <SearchFilterItem
                      key={idx}
                      ticker={item.symbol}
                      exchange={item.stock_exchange_short}
                    />
                  ))}
                </ul>
              ) : (
                <></>
              )}
            </div>
            <span className="header-links">
              <NavLink className="header-home" to="/">
                Home
              </NavLink>
              <button
                className="home-logout-button"
                onClick={this.props.logout}>
                Log Out
              </button>

              {/* <h3 className="header-name">
                        Hi, {props.currentUser.first_name} {props.currentUser.last_name}!
                        </h3>  */}
            </span>
          </div>
        );
    }
}

export default Header;