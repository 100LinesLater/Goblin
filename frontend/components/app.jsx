import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {AuthRoute, ProtectedRoute} from '../util/route-util';

import HeaderContainer from './header/header_container';
import LoginFormContainer from './login-signup/login_form_container';
import SignupFormContainer from './login-signup/signup_form_container';

const App = () => (
    <div>
        <Switch>
            <AuthRoute path="/login" component={LoginFormContainer} />
            <AuthRoute path="/signup" component={SignupFormContainer} />
            <ProtectedRoute path="/" component={HeaderContainer} />
        </Switch>

        
        {/* <AuthRoute path="/home" component={SplashPageContainer} /> */}
        
    </div>
);

export default App;