import React , { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

export default class SignInPage extends Component {

constructor(props) {
    super(props);

    this.state ={
        email:'',
        password:''
    }
}

handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({email:'', password:'' })
}

render(){
    const { email ,password } = this.state
    return(
        <div className="text-center m-5-auto">
            <h2>
                i already have an account
            </h2>
            <span> 
                Sign in with your email and password
            </span>

            <form onSubmit={this.handleSubmit}>
                <p>
                    <label>Username or email address</label><br/>
                    <input type="text" name="email" value= {email} required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" name="password" value= {password} required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
        )
    }
}
