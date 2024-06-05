import React, { useState } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import MapDisplay from './components/MapDisplay';
import './App.css';

const App: React.FC = () => {
  const [lat, setLat] = useState<number>(51.505);
  const [lon, setLon] = useState<number>(-0.09);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setLat(parseFloat(formData.get('latitude') as string));
    setLon(parseFloat(formData.get('longitude') as string));
  };

  const handleMapClick = (lat: number, lon: number) => {
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
