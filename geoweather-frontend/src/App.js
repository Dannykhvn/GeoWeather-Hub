import React, { useState } from 'react';
import WeatherController from './weatherController';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
import Register from './register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <main>
        <div className="bg-image">
          <Router>
            <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register onRegister={handleRegister} />} />
              {isLoggedIn ? (
                <Route path="/weather" element={<WeatherController onLogout={handleLogout} />} />
              ) : null}
            </Routes>
          </Router>
        </div>
      </main>
    </div>
  );
}

export default App;
