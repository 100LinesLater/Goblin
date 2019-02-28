import React from 'react';
import {Route} from 'react-router-dom';
import {AuthRoute, ProtectedRoute} from '../util/route-util';

import HeaderContainer from './header/header_container';
import LoginFormContainer from './login-signup/login_form_container';
import SignupFormContainer from './login-signup/signup_form_container';

const App = () => (
    <div>
        {/* {<Header />} */}

        <h1>Goblin</h1>
        <HeaderContainer />
        {/* {<Footer />} */}
        
        <AuthRoute path="/login" component={LoginFormContainer}/>
        <AuthRoute path="/signup" component={SignupFormContainer}/>
    </div>
);

export default App;