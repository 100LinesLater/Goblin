import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = (props) => (
    <div className="nav-bar">
        <div className="logo-top"></div>
        <div className="stock-search-bar">
            <span class="fa fa-search"></span>
            <input className="search-bar-input"
                type="text"
                placeholder="Search" />
        </div>
        <headerlinks className="header-links">
            <NavLink className="header-home"
                to="/">Home
                </NavLink>
            <NavLink className="header-account"
                to="/account">
                Account
                </NavLink>
            <button
                className="home-logout-button"
                onClick={props.logout}>Log Out
                </button>

            {/* <h3 className="header-name">
                Hi, {props.currentUser.first_name} {props.currentUser.last_name}!
                </h3>  */}
        </headerlinks>
    </div>
);

export default Header;