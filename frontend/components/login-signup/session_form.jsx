import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import HeaderContainer from '../header/header_container';

let login = {email: '', password: ''};
let signup = {first_name: '', last_name: '', email: '', password: '', buying_power: 0};

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.formType === 'Sign Up' ? signup : login;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(type) {
        return (e) => {
            this.setState({[type]: e.target.value});
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
        
    }

    render () {
        return  (
        <section className="session">
            <div className="session-image"></div>
            <div className="session-form-container">
            <div className="session-form">
            <h2>Welcome to Goblin</h2>
            <form className="session-form-inner" onSubmit={this.handleSubmit}>
                {this.props.formType === 'Sign Up' ? (
                    <div className="session-form-name">
                    <label>
                        <input className="session-form-input-name"
                        type="text"
                        placeholder="First Name"
                        value={this.state.first_name}
                        onChange={this.handleInput("first_name")}
                        />{"  "}<input className="session-form-input-name"
                        type="text"
                        placeholder="Last Name"
                        value={this.state.last_name}
                        onChange={this.handleInput("last_name")}
                        />
                    </label>
                    </div>
                ) : ("") }
                <br></br>
                <div className="session-form-email">
                <label> Email:
                    <br></br>
                    <input className="session-form-input"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleInput("email")}
                    />
                </label>
                </div>
                <br></br>
                <div className="session-form-pass">
                <label> Password: 
                    <br></br>
                <input className="session-form-input"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInput("password")}
                    />
                </label>
                </div>
                <div className="session-form-demo-link">
                    <Link to="/demo-login">Have Goblins stolen your password? Try our demo login.</Link>
                </div>
                <br></br>
                {this.props.errors.length > 0 ? (
                    <div className="session-form-errors">
                        <ul>
                        {this.props.errors.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                        </ul>
                    </div>) : ("")
                }
                <br></br>
                <button className="session-form-button">{this.props.formType}</button>
            </form>
                    </div>
                </div>
        </section>)
    }
}

export default withRouter(SessionForm);