import React, {Fragment, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import {AuthRoute, ProtectedRoute} from '../util/route-util';

import {CircleLoader} from 'react-spinners';

import SplashPageContainer from './splash/splash_page_container';
import HeaderContainer from './header/header_container';
import LoginFormContainer from './login-signup/login_form_container';
import SignupFormContainer from './login-signup/signup_form_container';
import HomePageContainer from './home-page/home_page_container';
import StockPageContainer from './stock-page/stock_page_container';

const App = () => (
    <div>
        <Switch>
            <AuthRoute path="/login" component={LoginFormContainer} />
            <AuthRoute path="/signup" component={SignupFormContainer} />
            <AuthRoute path="/home" component={SplashPageContainer} />
            <ProtectedRoute path="/" component={HeaderContainer} />
        </Switch>

        <Fragment >
            <Suspense fallback={<CircleLoader />}>
                <Switch>
                    <ProtectedRoute exact path="/" component={HomePageContainer} />
                    <ProtectedRoute exact path="/stocks/:ticker" component={StockPageContainer} />
                </Switch>
            </Suspense>
        </Fragment>

    </div>
);

export default App;