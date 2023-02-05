import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/login/login';
import Register from './components/register/register';
import Home from './components/home/home';

import './app.scss';
import { useEffect } from 'react';

const App = () => {
    return(
        <Routes>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/' element={<Navigate to='/register' replace/>}></Route>
            <Route path='*' element={<Navigate to='/register' replace/>}></Route>
        </Routes>
    );
};

export default App;