import React, {Fragment, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import {AuthRoute, ProtectedRoute} from '../util/route-util';

import SplashPageContainer from './splash/splash_page_container';
import HeaderContainer from './header/header_container';
import LoginFormContainer from './login-signup/login_form_container';
import SignupFormContainer from './login-signup/signup_form_container';
import HomePageContainer from './home-page/portfolio-chart/portfolio_chart_container';

const App = () => (
    <div>
        <Switch>
            <AuthRoute path="/login" component={LoginFormContainer} />
            <AuthRoute path="/signup" component={SignupFormContainer} />
            <AuthRoute path="/home" component={SplashPageContainer} />
            <ProtectedRoute path="/" component={HeaderContainer} />
        </Switch>

        <Fragment >
            <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute exact path="/" component={HomePageContainer} />
            </Suspense>
        </Fragment>
        
    </div>
);

export default App;