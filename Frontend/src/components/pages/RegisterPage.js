import React , { useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import '../../App.css'

// import React from 'react'

function RegisterPage() {

    const [data, setData] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:''
    })
   const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('http://localhost:8000/api/users/signup',{
        firstname:data.firstname,
        lastname:data.lastname,
        email:data.email,
        password:data.password
        } )
        .then(res =>{
        console.log(res.data)
    })

       setData({
            firstname:'',
            lastname:'',
            email:'',
            password:''
        })
    }
        
    const  handleOnChange = (e) => {
        const regDetails = {...data};
        regDetails[e.target.name] = e.target.value

        setData(regDetails)
        console.log(data)
    }

    return (
        <div className="text-center m-5-auto">
        <h5>Create your personal account</h5>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <p>
                <label>FirstName</label><br/>
                <input type="text" name="firstname" value= {data.firstname} onChange = {(e)=>handleOnChange(e)}  required />
                
            </p>
            <p>
                <label>LastName</label><br/>
                <input type="text" name="lastname" value= {data.lastname} onChange = {(e)=>handleOnChange(e)} required />
            </p>
            <p>
                <label>Email address</label><br/>
                <input type="email" name="email" value= {data.email} onChange = {(e)=>handleOnChange(e)}  required />
            </p>
            <p>
                <label>Password</label><br/>
                <input type="password" name="password" value= {data.password} onChange = {(e)=>handleOnChange(e)}  required />
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



   export default RegisterPage;