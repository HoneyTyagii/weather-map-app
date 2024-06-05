import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

interface MapDisplayProps {
  lat: number;
  lon: number;
  zoom?: number;
  onMapClick: (lat: number, lon: number) => void;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ lat, lon, zoom = 13, onMapClick }) => {
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([lat, lon]);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
        onMapClick(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  return (
    <MapContainer center={[lat, lon]} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={markerPosition} />
      <MapEvents />
    </MapContainer>
  );
};

export default MapDisplay;
