import React from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Register button clicked');
    onRegister();
    navigate('/login');
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
            <input type="text" className="form-control" placeholder="Email" />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Username" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" />
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
