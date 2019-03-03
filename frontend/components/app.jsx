import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {AuthRoute, ProtectedRoute} from '../util/route-util';

import SplashPageContainer from './splash/splash_page_container';
import HeaderContainer from './header/header_container';
import LoginFormContainer from './login-signup/login_form_container';
import SignupFormContainer from './login-signup/signup_form_container';

const App = () => (
    <div>
        <Switch>
            <AuthRoute path="/login" component={LoginFormContainer} />
            <AuthRoute path="/signup" component={SignupFormContainer} />
            <AuthRoute path="/home" component={SplashPageContainer} />
            <ProtectedRoute path="/" component={HeaderContainer} />
        </Switch>

        {/* <ProtectedRoute path="/" component={HomePageContainer} /> */}
        
    </div>
);

export default App;