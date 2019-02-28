import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
    const headerLinks = () => (
        <nav className="login-signup">
            <Link to="/login">Log In</Link> or <Link to="/signup">Sign Up</Link>
        </nav>
    );
    const personalHeader = () => (
        <hgroup className="header-group">
            <h2 className="header-name">
            Hi, {props.currentUser.first_name} {props.currentUser.last_name}!</h2>
            <button className="header-button" onClick={props.logout}>Log Out</button>
        </hgroup>
    );

    return props.currentUser ? personalHeader() : headerLinks();
};

export default Header;