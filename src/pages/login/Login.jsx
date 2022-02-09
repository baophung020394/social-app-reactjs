import React, { useRef, useContext } from 'react';
import { loginCall } from '../../api/apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';

import './login.css';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  console.log(user);
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
          <form className='loginBox' onSubmit={handleSubmit}>
            <input type='email' required placeholder='Email' ref={email} className='loginInput' />

            <input
              type='password'
              required
              placeholder='Password'
              minLength='6'
              ref={password}
              className='loginInput'
            />
            <button className='loginButton' disabled={isFetching}>
              {isFetching ? <CircularProgress color='inherit' size='24px' /> : 'Log In'}
            </button>
            <span className='loginForgot'>Forgot password</span>
            <button className='loginRegisterButton'>
              {isFetching ? (
                <CircularProgress color='inherit' size='24px' />
              ) : (
                'Create a new Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
