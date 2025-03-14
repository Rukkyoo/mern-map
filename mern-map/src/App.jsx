import "./App.css";
import React, { useState, useMemo } from "react";
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { decode, encode } from "@googlemaps/polyline-codec";
/* import {
  GoogleMap,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749, // Default center (San Francisco)
  lng: -122.4194,
}; */

function App() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // Track which input is active
  /*   const [path, setPath] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  }); */

  // Fetching the autocomplete suggestions
  const fetchSuggestions = async (input) => {
    try {
      const response = await axiosInstance.post("/autocomplete", {
        input,
        locationBias: {
          circle: {
            center: {
              latitude: 37.76999,
              longitude: -122.44696,
            },
            radius: 500.0,
          },
        },
      });
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.log(error);
    }
  };

  // Route Computation
  const computeRoute = async () => {
    try {
      const response = await axiosInstance.post("/route", {
        origin,
        destination,
      });
      console.log(response.data.routes[0].distanceMeters);
      setRoute(response.data.routes[0]);
      // Decode the polyline
      /*       const decodedPath = decode(route.polyline.encodedPolyline);
      setPath(decodedPath.map(([lat, lng]) => ({ lat, lng }))); */
    } catch (error) {
      console.log(error);
    }
  };

  // Decode the polyline

  // Handles the change event for the origin input field
  const handleOriginChange = (value) => {
    setOrigin(value);
    setActiveInput("origin"); // Set the active input to origin
    fetchSuggestions(value);
  };

  // Handles the change event for the destination input field
  const handleDestinationChange = (value) => {
    setDestination(value);
    setActiveInput("destination"); // Set the active input to destination
    fetchSuggestions(value);
  };

  // Handles the click event for the suggestion
  const handleSuggestionClick = (suggestion) => {
    const selectedText = suggestion.placePrediction.text.text;
    if (activeInput === "origin") {
      setOrigin(selectedText);
    } else if (activeInput === "destination") {
      setDestination(selectedText);
    }
    setSuggestions([]);
  };

  /*   if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>; */


  return (
    <div className="bg-black h-screen flex flex-col items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          computeRoute();
          setShowRoute(true);
        }}
        className="my-10 flex flex-col items-center"
      >
        <label className="mb-3" for="search">
          <span className="mb-10 text-white">Current Location: </span>{" "}
        </label>
        <input
          type="search"
          onChange={(e) => handleOriginChange(e.target.value)}
          value={origin}
          class="p-1 mb-2 w-80 text-sm text-gray-700 bg-gray-200 border border-white rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Where are you coming from?"
        ></input>

        <label className="mb-3" for="search">
          <span className="mb-10 text-white">Destination: </span>{" "}
        </label>
        <input
          type="search"
          onChange={(e) => handleDestinationChange(e.target.value)}
          value={destination}
          class="p-1 mb-2 w-80 text-sm text-gray-700 bg-gray-200 border border-white rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Where are you going to?"
        ></input>

        <ul>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.placePrediction.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer  w-80 bg-slate-200 hover:bg-gray-300"
            >
              {suggestion.placePrediction.text.text}
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className="bg-slate-200 mt-10 rounded-md p-1 cursor-pointer"
        >
          Calculate Route
        </button>
      </form>
      {showRoute && route && (
        <div className="text-white mt-5 text-center">
          <h2 className="text-bold">Route Details</h2>
          <p>Distance: {route.distanceMeters} meters</p>
          <p>Duration: {route.duration}</p>{" "}
        </div>
      )}
      {/*       <div className="mt-5 w-full px-4">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
        >
          {path.length > 0 && (
            <Polyline
              path={path}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
              }}
            />
          )}
        </GoogleMap>
      </div> */}
    </div>
  );
}

export default App;
