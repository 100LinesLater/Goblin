import React from 'react';
import {withRouter} from 'react-router-dom';

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
        <section>
            <h2>{this.props.formType}</h2>
            {this.props.errors.length > 0 ? (
                <ul>
                {this.props.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                ))}
                </ul>) : <p></p>}
            <form onSubmit={this.handleSubmit}>
                {this.props.formType === 'Sign Up' ? (
                    <label>
                        First Name: <input 
                        type="text"
                        value={this.state.first_name}
                        onChange={this.handleInput("first_name")}
                        /> Last Name: <input 
                        type="text"
                        value={this.state.last_name}
                        onChange={this.handleInput("last_name")}
                        />
                    </label>
                ) : <label></label>}
                <br></br>
                <label> Email: 
                    <input 
                    type="text"
                    value={this.state.email}
                    onChange={this.handleInput("email")}
                    />
                </label>
                <br></br>
                <label> Password: 
                    <input 
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInput("password")}
                    />
                </label>
                <br></br>
                <button>{this.props.formType}</button>
            </form>
        </section>)
    }
}

export default withRouter(SessionForm);