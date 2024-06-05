import React, { useState } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import MapDisplay from './components/MapDisplay';
import './App.css';

const App: React.FC = () => {
  const [lat, setLat] = useState<number>(51.505);
  const [lon, setLon] = useState<number>(-0.09);
  const [inputLat, setInputLat] = useState<string>(lat.toString());
  const [inputLon, setInputLon] = useState<string>(lon.toString());

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const latitude = parseFloat(inputLat);
    const longitude = parseFloat(inputLon);

    if (isNaN(latitude) || isNaN(longitude)) {
      alert("Please enter valid values for latitude and longitude.");
      return;
    }

    setLat(latitude);
    setLon(longitude);
  };

  const handleMapClick = (lat: number, lon: number) => {
    setLat(lat);
    setLon(lon);
    setInputLat(lat.toString());
    setInputLon(lon.toString());
  };

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <label>
          Latitude:
          <input 
            type="text" 
            name="latitude" 
            value={inputLat} 
            onChange={(e) => setInputLat(e.target.value)} 
            required 
          />
        </label>
        <label>
          Longitude:
          <input 
            type="text" 
            name="longitude" 
            value={inputLon} 
            onChange={(e) => setInputLon(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      <MapDisplay lat={lat} lon={lon} onMapClick={handleMapClick} />
      <WeatherDisplay lat={lat} lon={lon} />
    </div>
  );
};

export default App;
