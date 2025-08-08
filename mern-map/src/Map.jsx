import React, { useState, useCallback, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import components
import RouteForm from './components/RouteForm';
import RouteInfo from './components/RouteInfo';
import MapView from './components/MapView';

// Import hooks
import { useGeocoding } from './hooks/useGeocoding';
import { useRouting } from './hooks/useRouting';

// Import marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MappingComponent = () => {
  // Location states
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [activeInput, setActiveInput] = useState(null);
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  // Custom hooks
  const { 
    suggestions, 
    isLoading: isGeocodingLoading, 
    searchLocations, 
    clearSuggestions 
  } = useGeocoding();
  
  const { 
    coordinates, 
    distance, 
    duration, 
    isLoading: isRoutingLoading, 
    calculateRoute, 
    clearRoute 
  } = useRouting();

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (activeInput === 'origin' && origin.length >= 3) {
        searchLocations(origin);
      } else if (activeInput === 'destination' && destination.length >= 3) {
        searchLocations(destination);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [origin, destination, activeInput, searchLocations]);

  const handleInputChange = useCallback((value, inputType) => {
    if (inputType === 'origin') {
      setOrigin(value);
      if (value !== origin) {
        setOriginCoords(null);
        clearRoute();
      }
    } else {
      setDestination(value);
      if (value !== destination) {
        setDestinationCoords(null);
        clearRoute();
      }
    }
    setActiveInput(inputType);
  }, [origin, destination, clearRoute]);

  const handleSuggestionClick = useCallback((suggestion) => {
    const { coordinates } = suggestion.geometry;
    const name = suggestion.properties.name || suggestion.properties.label;

    if (activeInput === 'origin') {
      setOrigin(name);
      setOriginCoords([coordinates[1], coordinates[0]]); // Convert to [lat, lon]
    } else {
      setDestination(name);
      setDestinationCoords([coordinates[1], coordinates[0]]); // Convert to [lat, lon]
    }

    clearSuggestions();
    setActiveInput(null);
  }, [activeInput, clearSuggestions]);

  const handleRouteCalculation = useCallback(() => {
    if (!originCoords || !destinationCoords) {
      alert('Please select both origin and destination locations');
      return;
    }
    calculateRoute(originCoords, destinationCoords);
  }, [originCoords, destinationCoords, calculateRoute]);

  return (
    <div className="bg-gray-900 min-h-screen p-4 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Route Planner
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <RouteForm
              origin={origin}
              destination={destination}
              suggestions={suggestions}
              onInputChange={handleInputChange}
              onSuggestionClick={handleSuggestionClick}
              onSubmit={handleRouteCalculation}
              isLoading={isRoutingLoading || isGeocodingLoading}
            />
            
            <RouteInfo distance={distance} duration={duration} />
          </div>
          
          <div className="flex-1 w-full">
            <MapView
              originCoords={originCoords}
              destinationCoords={destinationCoords}
              coordinates={coordinates}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MappingComponent;