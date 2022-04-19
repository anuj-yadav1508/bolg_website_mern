import axios from 'axios'
import React, { useRef } from 'react'
import { useGlobalContext } from '../../context/AuthContext'
import './login.css'

const Login = () => {
    const {user, isFetching, isError, dispatch} = useGlobalContext()
    const emailRef = useRef()
    const passwordRef = useRef()

    
    const handleSubmit = (e) => {
        e.preventDefault()

        const loginCall = async (userCredentials, dispatch) => {
            dispatch({type:'LOGIN_START'})

            try {
                const res = await axios.post('/auth/login', userCredentials)
                dispatch({type:'LOGIN_SUCCESS', payload:res.data})
                localStorage.setItem('user', JSON.stringify(res.data))
            } catch (err) {
                dispatch({type:'LOGIN_FAILURE', payload:err})
            }
        }


        loginCall({email: emailRef.current.value, password: passwordRef.current.value}, dispatch)

        console.log(user, isFetching, isError)
        
    }

    return (
        <section className='loginSection'>
            <div className="loginWrapper">
                <div className="loginHeading">Login</div>
                <form className="loginForm" onSubmit={handleSubmit}>
                    
                    <input type="email" placeholder='Email:' className="loginInput" ref={emailRef}/>
                    <br />
                    <input type="password" placeholder='Password:' className="loginInput" ref={passwordRef}/>
                    <br />

                    <br />
                    <button className="loginSubmit" type='submit'>Login</button>
                </form>
                <p className="loginPara">Don't have an account? <span className="loginSpan"><a href="/register" className="loginLink">Register</a></span></p>
            </div>
        </section>
    )
}

export default Login
