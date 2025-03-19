import "./App.css";
import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";
import {
  APIProvider,
  useMap,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { decode } from "@googlemaps/polyline-codec";

const MappingComponent = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [route, setRoute] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [decodedPath, setDecodedPath] = useState([]);

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
      console.error("Error fetching suggestions:", error);
    }
  };

  const computeRoute = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/route", {
        origin,
        destination,
      });
      setRoute(response.data.routes[0]);
      setShowRoute(true);
      console.log("response.data.routes[0]:", response.data.routes[0]);
      const encodedPolyline = response.data.routes[0].polyline.encodedPolyline;
      console.log(decode(encodedPolyline, 5));
      setDecodedPath(decode(encodedPolyline, 5));
      const time = response.data.routes[0].legs[0].duration.text;
      console.log("time:", time);
    } catch (error) {
      setError("Failed to compute route. Please try again.");
      console.error("Error computing route:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOriginChange = (value) => {
    setOrigin(value);
    setActiveInput("origin");
    fetchSuggestions(value);
  };

  const handleDestinationChange = (value) => {
    setDestination(value);
    setActiveInput("destination");
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    const selectedText = suggestion.placePrediction.text.text;
    if (activeInput === "origin") {
      setOrigin(selectedText);
    } else if (activeInput === "destination") {
      setDestination(selectedText);
    }
    setSuggestions([]);
  };

  const MyComponent = () => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;
    }, [map]);

    return <></>;
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            computeRoute();
          }}
          className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Current Location:
            </label>
            <input
              type="search"
              onChange={(e) => handleOriginChange(e.target.value)}
              value={origin}
              className="w-full p-2 text-sm text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Where are you coming from?"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Destination:
            </label>
            <input
              type="search"
              onChange={(e) => handleDestinationChange(e.target.value)}
              value={destination}
              className="w-full p-2 text-sm text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Where are you going to?"
            />
          </div>

          {suggestions.length > 0 && (
            <ul className="mt-2 bg-gray-700 rounded-md shadow-md">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.placePrediction.place_id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-2 text-gray-300 hover:bg-gray-600 cursor-pointer"
                >
                  {suggestion.placePrediction.text.text}
                </li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Calculating..." : "Calculate Route"}
          </button>

         {/*  {error && (
            <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
          )} */}
        </form>

        {showRoute && route && (
          <div className="mt-6 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-bold mb-4">
              Route Details (By Driving)
            </h2>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Distance:</span>{" "}
                {route.distanceMeters} meters
              </p>
              <p className="text-sm">
                <span className="font-semibold">Duration:</span>{" "}
                {route.duration}
              </p>
            </div>
          </div>
        )}
        <div
          className="mt-6 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-white"
          style={{ height: "70vh" }}
        >
          <h2 className="text-xl font-bold mb-4">Map</h2>
          {/*  <Map
              className="h-4/5"
              zoom={6}
              mapId={"mern-map"}
              center={{ lat: 9.0820, lng: 8.6753 }}
              options={{
                zoomControl: true,
                mapTypeControl: true,
                streetViewControl: true,
                fullscreenControl: true,
              }}
            >
              <MyComponent />
              {decodedPath.length > 0 &&
                decodedPath.map((coordinate, index) => (
                  <AdvancedMarker
                    key={index}
                    position={{ lat: coordinate[0], lng: coordinate[1] }}
                  >
                    <Pin />
                    <InfoWindow>
                      <div className="text-gray-800">Coordinate {index}</div>
                    </InfoWindow>
                  </AdvancedMarker>
                ))}
            </Map> */}
          <Map
            className="h-4/5"
            defaultCenter={{ lat: 9.082, lng: 8.6753 }}
            defaultZoom={5}
            mapId={"mern-map"}
          >
            <MyComponent />
            {decodedPath.length > 0 &&
              decodedPath.map((coordinate, index) => (
                <AdvancedMarker
                  key={index}
                  position={{ lat: coordinate[0], lng: coordinate[1] }}
                >
                  <Pin />
                  <InfoWindow>
                    <div className="text-gray-800">Coordinate {index}</div>
                  </InfoWindow>
                </AdvancedMarker>
              ))}
          </Map>
        </div>
      </div>
    </APIProvider>
  );
};

export default MappingComponent;
