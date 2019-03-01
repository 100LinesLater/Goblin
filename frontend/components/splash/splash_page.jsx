import React from 'react';
import { NavLink } from 'react-router-dom';

const SplashPage = (props) => (
    <div className="nav-bar-2">
        <div className="logo-section">
            <div className="logo-image"></div>
            <h3>Goblin</h3>
        </div>
        <nav className="login-signup-buttons">
            <NavLink className="splash-login-button"
            to="/login">
                Log In
            </NavLink><NavLink className="splash-signup-button"
            to="/signup">
                Sign Up
            </NavLink>
        </nav>
    </div>
);

export default SplashPage;