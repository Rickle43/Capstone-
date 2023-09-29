import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check for a specific username and password combination
    if (username === 'Rick' && password === 'test123') {
      // Trigger the login by calling the onLogin function with the username
      onLogin(true, username);
      navigate('/');
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    // Check if the Enter key (key code 13) is pressed
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your password"
          />
        </div>
      </div>
      <div className="col-md-2">
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;