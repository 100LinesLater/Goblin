import React from 'react';
import { NavLink } from 'react-router-dom';

const SplashPage = (props) => (
    <div className="splash-page">
        <div className="nav-bar-2">
            <div className="logo-section">
                <NavLink to="/home" className="logo-image"></NavLink>
                <NavLink to="/home" className="logo-text">Goblin</NavLink>
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
        <div className="splash-main-content">
            <div className="signup-message-content">
                <h1>Invest for Free</h1>
                <p>Invest in stocks, ETFs, options, and cryptocurrencies, 
                all commission-free, right from your phone or desktop.</p>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <NavLink className="splash-signup-button"
                to="/signup">
                    Sign Up
                </NavLink>
            </div>
            <div className="splash-main-image"></div>
        </div>
    </div>
);

export default SplashPage;