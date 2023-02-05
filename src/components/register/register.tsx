import React, { ChangeEvent, FormEvent, MouseEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './register.scss';

import visible from '../../assets/svg/visible.svg';
import invisible from '../../assets/svg/invisible.svg';

import User from '../../util/interfaces/User';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  

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

  const registerUser = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_PROD_SERVER}/user/register`, {
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
    }else {
      alert('The given email address is already in use! Choose another one!');
      return;
    };
  }

  return(
    <div className="register">
      <h1>Register new user</h1>
      <form className="register-form" onSubmit={(e) => registerUser(e)}>
        <div id="first-name-field">
          <input id='firstName' type="text" placeholder='First name' required onChange={(e) => inputHandler(e)}/>
        </div>
        <div id="last-name-field">
          <input id='lastName' type="text" placeholder='Last name' required onChange={(e) => inputHandler(e)}/>
        </div>
        <div id="email-field">
          <input id='email' type="email" placeholder='Email' required onChange={(e) => inputHandler(e)}/>
        </div>
        <div id="password-field">
          <input id='password' type="password" placeholder='********' required minLength={6} onChange={(e) => inputHandler(e)}/>
          <button id='visibility' onClick={(e) => passVisible(e)}><img id='visibility-img' src={invisible}></img></button>
        </div>
        <button id='submit' type='submit' value='register'>Register</button>
      </form>
      <div className="login">
        <p>Have an account?</p>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default Register;
