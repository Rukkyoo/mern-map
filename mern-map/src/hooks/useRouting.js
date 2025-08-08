import { useState, useCallback } from 'react';
import axios from 'axios';

export const useRouting = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const calculateRoute = useCallback(async (originCoords, destinationCoords) => {
    if (!originCoords || !destinationCoords) {
      console.error('Origin and destination coordinates are required');
      return;
    }

    setIsLoading(true);
    try {
      // Try OpenRouteService first (requires API key)
      const orsApiKey = import.meta.env.VITE_ORS_API_KEY;
      
      if (orsApiKey) {
        try {
          const response = await axios.post(
            'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
            {
              coordinates: [
                [originCoords[1], originCoords[0]], // ORS expects [lon, lat]
                [destinationCoords[1], destinationCoords[0]]
              ]
            },
            {
              headers: {
                'Authorization': orsApiKey,
                'Content-Type': 'application/json'
              },
              timeout: 10000
            }
          );

          const routeCoords = response.data.features[0].geometry.coordinates.map(
            coord => [coord[1], coord[0]] // Convert back to [lat, lon] for Leaflet
          );
          
          setCoordinates(routeCoords);
          
          const summary = response.data.features[0].properties.summary;
          setDistance(`${(summary.distance / 1000).toFixed(2)} km`);
          setDuration(`${(summary.duration / 60).toFixed(0)} mins`);
          
          return;
        } catch (orsError) {
          console.warn('OpenRouteService failed, trying fallback:', orsError.message);
        }
      }

      // Fallback: Use OSRM (free, no API key required)
      try {
        const response = await axios.get(
          `https://router.project-osrm.org/route/v1/driving/${originCoords[1]},${originCoords[0]};${destinationCoords[1]},${destinationCoords[0]}?overview=full&geometries=geojson`,
          { timeout: 10000 }
        );

        if (response.data.routes && response.data.routes.length > 0) {
          const route = response.data.routes[0];
          const routeCoords = route.geometry.coordinates.map(
            coord => [coord[1], coord[0]] // Convert [lon, lat] to [lat, lon]
          );
          
          setCoordinates(routeCoords);
          setDistance(`${(route.distance / 1000).toFixed(2)} km`);
          setDuration(`${(route.duration / 60).toFixed(0)} mins`);
        } else {
          throw new Error('No routes found');
        }
      } catch (osrmError) {
        console.error('OSRM routing failed:', osrmError);
        
        // Last fallback: Draw a straight line
        const straightLine = [originCoords, destinationCoords];
        setCoordinates(straightLine);
        
        // Calculate approximate distance using Haversine formula
        const distance = calculateHaversineDistance(originCoords, destinationCoords);
        setDistance(`${distance.toFixed(2)} km (straight line)`);
        setDuration('N/A');
      }
      
    } catch (error) {
      console.error('Route calculation error:', error);
      setCoordinates([]);
      setDistance('');
      setDuration('');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearRoute = useCallback(() => {
    setCoordinates([]);
    setDistance('');
    setDuration('');
  }, []);

  return {
    coordinates,
    distance,
    duration,
    isLoading,
    calculateRoute,
    clearRoute
  };
};

// Helper function to calculate distance between two points using Haversine formula
function calculateHaversineDistance([lat1, lon1], [lat2, lon2]) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}