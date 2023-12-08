import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Login button clicked", username, password);

    try {
      // Send login request to the server
      const response = await axios.post('http://localhost:5000/api/login', { username: username, password: password });
      
      if (response.status === 200) {
        // If successful, trigger onLogin and navigate to '/weather'
        onLogin();
        navigate('/weather');
      }
    } catch (error) {
      console.error('Login failed', error.response.data.message);
      // Handle login failure (display error message, etc.)
    }
  };

  return (
    <div className="bg-image">
      <div className="login-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/geoweather-hub-logo-login.png`}
          alt="Logo"
          className="logo-login"
        />
        <h1 className="geoWeather-login">GeoWeather Hub</h1>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <input type="text" id="username" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="password" id="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>Login</button>
        </form>
        <p className="login-text">
          Don't have an account? Please register{' '}
          <span className="login-link" onClick={() => navigate('/register')}>
            here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
