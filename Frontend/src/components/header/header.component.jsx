import React from 'react'
import {Link } from 'react-router-dom'
import './header.styles.css'
import {ReactComponent as Logo} from '../../assets/crown.svg'

const Header = () => {
    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                 <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option'to='register' >
                    register
                </Link>
                <Link className='option'to='login' >
                    login
                </Link>
            </div>
        </div>
    )
}

export default Header
 