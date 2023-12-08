import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Register button clicked');

    try {
      // Send registration request to the server
      const response = await axios.post('http://localhost:5000/api/register', { email, username, password });

      if (response.status === 201) {
        // If successful, trigger onRegister and navigate to '/login'
        onRegister();
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed', error.response.data.message);
      // Handle registration failure (display error message, etc.)
    }
  };

  return (
    <div className="bg-image">
      <div className="register-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/geoweather-hub-logo-login.png`}
          alt="Logo"
          className="logo-login"
        />
        <h1 className="register-header">Please create an account</h1>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>
            Create Account
          </button>
        </form>

        <p className="login-text">
          Already have an account? Please login{' '}
          <span className="login-link" onClick={() => navigate('/login')}>
            here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
