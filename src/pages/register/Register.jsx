import axios from 'axios';
import React from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './register.css';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    
    if (passwordAgain.current.value !== password.current.value) {

      passwordAgain.current.setCustomValidity("Passwords don't match!");

    } else {

      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {

        await axios.post('/auth/register', user);
        history.push("/login");
        
      } catch (error) {

        console.log('error', error);

      }
    }
  };

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Baosocial</h3>
          <span className='loginDesc'>
            Connect with friends and the world around you on Baosocial.
          </span>
        </div>
        <div className='loginRight'>
          <form onSubmit={handleClick} className='loginBox'>
            <input placeholder='Username' required ref={username} className='loginInput' />
            <input placeholder='Email' type='email' required ref={email} className='loginInput' />
            <input
              placeholder='Password'
              type='password'
              required
              ref={password}
              className='loginInput'
              minLength='6'
            />
            <input
              placeholder='Password Again'
              required
              ref={passwordAgain}
              className='loginInput'
              type='password'
            />
            <button className='loginButton' type='submit'>
              Sign up
            </button>
            <button className='loginRegisterButton'>Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
