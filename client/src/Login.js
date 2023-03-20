import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import './Login.css';

const LoginPage = ({ setIsLoggedIn }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'p') {
            setIsLoggedIn(true);
            navigate('/private');
        } else {
            toast.info('Invalid username or password');
        }
    };
    return (
        <div className="card" style={{
            width: "28rem",
            marginLeft: "auto",
            marginRight: "auto"
        }}>
            <h1 className='card-title text-center'>Login</h1>
            <form className='card-body text-center' onSubmit={handleLogin}>
                <label>
                    Username: <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
                </label>
                <br />
                <label>
                    Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button className='btn btn-primary' type="submit">Login</button>
            </form>
            <ToastContainer />
        </div>
    )
};

export default LoginPage;