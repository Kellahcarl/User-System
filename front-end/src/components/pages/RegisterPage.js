import React , { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

export default class SignUpPage extends Component {
    constructor(props) {
        super(props);

        this.state ={
            firstname:'',
            lastname:'',
            email:'',
            password:''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

         this.setState({email:'', password:'' })
    }

    handleChange =(event) => {
        const { value , name } = event.target;

        this.setState({ [name]: value})
    }

    render() {
      return (
        <div className="text-center m-5-auto">
            <h5>Create your personal account</h5>
            <form onSubmit={this.handleSubmit}>
                <p>
                    <label>FirstName</label><br/>
                    <input type="text" name="first_name" required />
                </p>
                <p>
                    <label>LastName</label><br/>
                    <input type="text" name="last_name" required />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" requiredc />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
};
