import './App.css';
import React from 'react';
import WeatherController from './weatherContoller'; // Adjust the path

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GeoWeather Hub</h1>
      </header>
      <main>
        <WeatherController />
      </main>
    </div>
  );
}

export default App;
