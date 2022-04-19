import React from 'react'
import './register.css'

const Register = () => {
    return (
        <section className='registerSection'>
            <div className="registerWrapper">
                <div className="registerHeading">Register</div>
                <form className="registerForm">
                    <input type="text" placeholder='Username:' className="registerInput" />
                    <br />
                    <input type="text" placeholder='Name:' className="registerInput" />
                    <br />
                    <input type="email" placeholder='Email:' className="registerInput" />
                    <br />
                    <input type="password" placeholder='Password:' className="registerInput" />
                    <br />
                    <input type="password" placeholder='Confirm Password:' className="registerInput" />
                    <br />
                    <br />
                    <button className="registerSubmit" type='submit'>Register</button>
                </form>
                <p className="registerPara">Already have an account? <span className="registerSpan"><a href="/login" className="registerLink">Login</a></span></p>
            </div>
        </section>
    )
}

export default Register
