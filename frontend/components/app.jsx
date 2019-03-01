import React from 'react';
import {Route} from 'react-router-dom';
import {AuthRoute, ProtectedRoute} from '../util/route-util';

import HeaderContainer from './header/header_container';
import LoginFormContainer from './login-signup/login_form_container';
import SignupFormContainer from './login-signup/signup_form_container';

const App = () => (
    <div>
        <ProtectedRoute exact path="/" component={PortfolioContainer} />
        <AuthRoute exact path="/home" component={SplashContainer} />
        <AuthRoute exact path="/login" component={LoginFormContainer}/>
        <AuthRoute exact path="/signup" component={SignupFormContainer}/>
    </div>
);

export default App;