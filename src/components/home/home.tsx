import React, { useEffect, useState, MouseEvent } from 'react';
import './home.scss';

import User from '../../util/interfaces/User';
import { useNavigate } from 'react-router-dom';
import UserToken from '../../util/interfaces/UserToken';

const Home = () => {

  const [user, setUser] = useState({} as User);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('token') === null) {
      navigate('/register');
    }else {
      const parsedToken: string[] = (localStorage.getItem('token') as string).split('.');
      const userToken: UserToken = JSON.parse(atob(parsedToken[1]));
      setUser(userToken.user);
    }
  }, []);

  const logoutUser = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/register');
  };

  return(
    <div className="home">
      <div className="text-area">
        <p>
          Welcome! <br />
          {user.firstName} {user.lastName}
        </p>
      </div>
      <div className="logout-option">
        <button onClick={(e) => {logoutUser(e)}}>Logout</button>
      </div>
    </div>
  );
  
};

export default Home;
