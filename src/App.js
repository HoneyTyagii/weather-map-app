import React, { useState } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import MapDisplay from './components/MapDisplay';
import './App.css';

const App = () => {
  const [lat, setLat] = useState(51.505);
  const [lon, setLon] = useState(-0.09);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setLat(parseFloat(formData.get('latitude')));
    setLon(parseFloat(formData.get('longitude')));
  };

  const handleMapClick = (lat, lon) => {
    setLat(lat);
    setLon(lon);
  };

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <label>
          Latitude:
          <input type="number" name="latitude" defaultValue={lat} required />
        </label>
        <label>
          Longitude:
          <input type="number" name="longitude" defaultValue={lon} required />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      <MapDisplay lat={lat} lon={lon} onMapClick={handleMapClick} />
      <WeatherDisplay lat={lat} lon={lon} />
    </div>
  );
};

export default App;
