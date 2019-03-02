import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

let login = {email: '', password: ''};
let signup = {first_name: '', last_name: '', email: '', password: '', buying_power: 0};
let demo;

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.formType === 'Sign Up' ? signup : login;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoUserFormFill = this.demoUserFormFill.bind(this);
    }

    demoUserFormFill() {
        let demoEmail = '$Money_Man$@Goblin.com'.split('');
        let demoPass = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1];
        let demoEmailTo = "";
        let demoPassTo = "";

        let i = 0;
        const x = demoEmail.length;
        demo = setInterval(() => {
            if (i === x + 10) {
                document.getElementById('session-form-submit').click();
            } 
            else if (i < x){
                i++;
                demoEmailTo += demoEmail.shift();
                demoPassTo += demoPass.shift();
                this.setState({email: demoEmailTo});
                this.setState({password: demoPassTo});
            }
            else {
                i++;
            }
        }, 110);
    }

    componentWillUnmount() {
        this.props.removeErrors();
        clearInterval(demo);
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
        this.props.removeErrors();
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
                        /><input className="session-form-input-name"
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
                <input className="session-form-input session-form-password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInput("password")}
                    />
                </label>
                </div>
                { this.props.formType === 'Sign In' ?
                (<div className="session-form-demo-link">
                    Have Goblins stolen your password? Try our <a 
                    className="demo-login"
                    onClick={this.demoUserFormFill}>
                    demo login
                    </a>.
                </div>) : ("")}
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
                <button id="session-form-submit" 
                className="session-form-button">
                    {this.props.formType}
                </button>
            </form>
                    </div>
                </div>
        </section>)
    }
}

export default withRouter(SessionForm);