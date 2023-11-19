import './App.css';
import React from 'react';
import WeatherController from './weatherController'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <main>
        <div className="bg-image">
            <WeatherController />
        </div>
      </main>
    </div>
  );
}

export default App;