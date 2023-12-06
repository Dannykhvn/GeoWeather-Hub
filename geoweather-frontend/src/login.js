import { useNavigate } from 'react-router-dom';
import './login.css'



const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Login button clicked");
    onLogin(); 
    navigate('/weather');
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
            <input type="text" className="form-control" placeholder="Username" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" />
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
