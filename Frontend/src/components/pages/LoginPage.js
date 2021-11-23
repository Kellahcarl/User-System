import React , { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import '../../App.css'


function SignInPage() {

    const [data, setData] = useState({
        email:'',
        password:''
    })
   const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('http://localhost:8000/api/users/login',{
        email:data.email,
        password:data.password
        } )
        .then(res =>{
        console.log(res.data)
    })

       setData({
            email:'',
            password:''
        })
    }
        
    const  handleOnChange = (e) => {
        const regDetails = {...data};
        regDetails[e.target.name] = e.target.value

        setData(regDetails)
    }

    return (
        <div className="text-center m-5-auto">
            <h2>
                i already have an account 
            </h2>

            <form onSubmit={handleSubmit}>
                <p>
                    <label>Username or email address</label><br/>
                    <input type="text" name="email" value= {data.email} onChange = {(e)=>handleOnChange(e)} required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" name="password" value= {data.password} onChange = {(e)=>handleOnChange(e)} required />
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

export default SignInPage;



