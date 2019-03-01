import React from 'react';
import {NavLink, Link} from 'react-router-dom';

const Header = (props) => {
    const generalHeader = () => (
        <div className="nav-bar">
            <div className="logo-section">
                <div className="logo-image"></div>
                <h3>Goblin</h3>
            </div>
            <nav className="login-signup">
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
        <homelinks className="header-group">
            <NavLink to="/">Home</NavLink>
            <button
                className="home-logout-button"
                onClick={props.logout}>Log Out
            </button>

            {/* <h3 className="header-name">
            Hi, {props.currentUser.first_name} {props.currentUser.last_name}!
            </h3>  */}
        </homelinks>
    );

    return props.currentUser ? personalHeader() : generalHeader();
};

export default Header;