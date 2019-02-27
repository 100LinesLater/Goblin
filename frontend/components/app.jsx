import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import {Route} from 'react-router-dom';
import LoginFormContainer from './login-signup/login_form_container';
import SignupFormContainer from './login-signup/signup_form_container';

const App = () => (
    <div>
        {/* {<Header />} */}

        <h1>Goblin</h1>
        <GreetingContainer />
        {/* {<Footer />} */}

        <Route path="/login" component={LoginFormContainer}/>
        <Route path="/signup" component={SignupFormContainer}/>
    </div>
);

export default App;