import React from 'react';
import {NavLink, Link} from 'react-router-dom';

const Header = (props) => {
    const generalHeader = () => (
        <div className="nav-bar">
            <div className="logo-section">
                <div className="logo-image"></div>
                <h3>Goblin</h3>
            </div>
            <nav className="login-signup-buttons">
                <NavLink className="splash-login-button"
                to="/login">
                Log In
                </NavLink> or <NavLink className="splash-signup-button"
                to="/signup">
                Sign Up
                </NavLink>
            </nav>
        </div>
    );
    const personalHeader = () => (
        <div className="nav-bar">
            <div className="logo-top"></div>
            <div className="stock-search-bar"></div>
            <headerlinks className="header-links">
                <NavLink className="header-home" 
                to="/">Home
                </NavLink>
                <a className="header-account">Account</a>
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

    return props.currentUser ? personalHeader() : generalHeader();
};

export default Header;