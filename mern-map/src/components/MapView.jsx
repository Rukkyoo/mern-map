import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Component to update map center when coordinates change
const MapUpdater = ({ originCoords, destinationCoords, coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates.length > 0) {
      // Fit map to show the entire route
      const bounds = coordinates.reduce((bounds, coord) => bounds.extend(coord), 
        new L.LatLngBounds(coordinates[0], coordinates[0]));
      map.fitBounds(bounds, { padding: [20, 20] });
    } else if (originCoords && destinationCoords) {
      // Fit map to show both markers
      const bounds = new L.LatLngBounds([originCoords, destinationCoords]);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (originCoords) {
      map.setView(originCoords, 10);
    }
  }, [map, originCoords, destinationCoords, coordinates]);

  return null;
};

const MapView = ({ originCoords, destinationCoords, coordinates }) => {
  const defaultCenter = [9.082, 8.6753]; // Nigeria center as fallback

  return (
    <div className="mt-6 w-full max-w-4xl h-[500px] rounded-sm overflow-hidden border border-gray-700">
      <MapContainer
        center={originCoords || defaultCenter}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        
        <MapUpdater 
          originCoords={originCoords}
          destinationCoords={destinationCoords}
          coordinates={coordinates}
        />
        
        {originCoords && (
          <Marker position={originCoords}>
            <Popup>
              <div className="text-center">
                <strong>Origin</strong>
              </div>
            </Popup>
          </Marker>
        )}
        
        {destinationCoords && (
          <Marker position={destinationCoords}>
            <Popup>
              <div className="text-center">
                <strong>Destination</strong>
              </div>
            </Popup>
          </Marker>
        )}
        
        {coordinates.length > 0 && (
          <Polyline 
            positions={coordinates} 
            color="#3B82F6" 
            weight={4}
            opacity={0.8}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;