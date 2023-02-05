import React, { ChangeEvent, FormEvent, MouseEvent, useState, useEffect } from 'react';
import './login.scss';

import visible from '../../assets/svg/visible.svg';
import invisible from '../../assets/svg/invisible.svg';

import User from '../../util/interfaces/User';
import { Link, useNavigate } from 'react-router-dom';

import * as dotenv from 'dotenv';

const Login = () => {
  const [user, setUser] = useState({} as User);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token') != null) {
      navigate('/home');
    };
  }, [])

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const passVisible = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
    
    e.preventDefault();

    const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    const passwordVisibility: HTMLImageElement = document.getElementById('visibility-img') as HTMLImageElement;

    if(isVisible) {
      passwordInput?.setAttribute('type', 'password');
      passwordInput?.setAttribute('placeholder', '********');
      passwordVisibility?.setAttribute('src', invisible);
    } else {
      passwordInput?.setAttribute('type', 'text');
      passwordInput?.setAttribute('placeholder', 'Password');
      passwordVisibility?.setAttribute('src', visible);
    };

    setIsVisible(!isVisible);
  };

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_PROD_SERVER}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });

    const data = await response.json();

    if(data.status === 'ok') {
      localStorage.setItem('token', data.token);
      navigate('/home');
    }else if(data.status === 'no_user'){
      alert('A user with the given email address does not exist!');
      return;
    }else if(data.status === 'wrong_pass'){
      alert('You have entered the wrong password!');
      return;
    }else {
      alert(`Error while retrieving user ${data.error}`);
      return;
    }
  };

  return(
    <div className="login">
      <h1>User login</h1>
      <form className="login-form" onSubmit={(e) => loginUser(e)}>
        <div id="email-field">
          <input id='email' type="email" placeholder='Email' required onChange={(e) => inputHandler(e)}/>
        </div>
        <div id="password-field">
          <input id='password' type="password" placeholder='********' required minLength={6} onChange={(e) => inputHandler(e)}/>
          <button id='visibility' onClick={(e) => passVisible(e)}><img id='visibility-img' src={invisible}></img></button>
        </div>
        <button id='submit' type='submit' value='register'>Login</button>
      </form>
      <div className="register">
        <p>Don't have an account?</p>
        <Link to='/register'>Register</Link>
      </div>
    </div>
  );
};

export default Login;
