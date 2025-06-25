# MERN Map - Route Calculation Application

## Overview

MERN Map is a full-stack web application that provides route calculation and mapping functionality using Google Maps APIs. The application allows users to:
- Search for locations with autocomplete suggestions
- Calculate driving routes between two points
- View route details including distance and duration
- Visualize the route on an interactive map

## Features

### Frontend Features
- **Location Search** with autocomplete suggestions
- **Route Calculation** between origin and destination
- **Interactive Map** displaying the calculated route
- **Route Details** showing distance and duration
- **Responsive Design** that works on various screen sizes
- **Visual Markers** along the calculated route

### Backend Features
- **Autocomplete API Endpoint** for location suggestions
- **Route Computation API Endpoint** for calculating routes
- **Error Handling** for API failures
- **CORS Support** for cross-origin requests

## Technologies Used

### Frontend
- **React** (v19.0.0) - JavaScript library for building user interfaces
- **Vite** (v6.2.0) - Next-generation frontend tooling
- **@vis.gl/react-google-maps** (v1.5.1) - React components for Google Maps
- **Tailwind CSS** (v4.0.12) - Utility-first CSS framework
- **Axios** (v1.8.2) - HTTP client for API requests
- **@googlemaps/polyline-codec** (v1.0.28) - For decoding polyline data

### Backend
- **Express.js** - Web application framework for Node.js
- **CORS** - Middleware for enabling Cross-Origin Resource Sharing
- **Dotenv** - For loading environment variables
- **Axios** - For making requests to Google Maps APIs

### Development Tools
- **ESLint** - JavaScript linter
- **Nodemon** - For automatic server restarts during development
- **Vite** - Fast development server and build tool

## Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/Rukkyoo/mern-map]
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   npm install
   cd frontend
   npm install
   ```

3. Create a `.env` file in the root directory with your Google Maps API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   VITE_GOOGLE_API_KEY=your_api_key_here
   PORT=8000
   ```

4. Start the development servers:
   ```bash
   # In root directory (backend)
   npm start
   
   # In frontend directory
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Starts the Vite development server (frontend)
- `npm start`: Starts the Express server (backend)
- `npm run build`: Creates a production build (frontend)
- `npm run lint`: Runs ESLint
- `npm run preview`: Previews the production build


## API Endpoints

### Backend API
- `POST /api/autocomplete` - Returns location suggestions
  - Request body: `{ input: "search term" }`
  - Response: Google Places API autocomplete suggestions

- `POST /api/route` - Calculates route between two points
  - Request body: `{ origin: "location", destination: "location" }`
  - Response: Route information including distance, duration, and polyline

## Environment Variables

- `GOOGLE_API_KEY` - Your Google Maps API key (backend)
- `VITE_GOOGLE_API_KEY` - Your Google Maps API key (frontend)
- `PORT` - Port for the Express server (default: 8000)

## Dependencies

### Production Dependencies
- `@googlemaps/polyline-codec`: ^1.0.28
- `@react-google-maps/api`: ^2.20.6
- `@tailwindcss/vite`: ^4.0.12
- `@vis.gl/react-google-maps`: ^1.5.1
- `axios`: ^1.8.2
- `cors`: ^2.8.5
- `dotenv`: ^16.4.7
- `express`: ^4.21.2
- `js-marker-clusterer`: github:googlemaps/markerclusterer
- `nodemon`: ^3.1.9
- `react`: ^19.0.0
- `react-dom`: ^19.0.0
- `tailwindcss`: ^4.0.12

### Development Dependencies
- `@eslint/js`: ^9.21.0
- `@types/react`: ^19.0.10
- `@types/react-dom`: ^19.0.4
- `@vitejs/plugin-react`: ^4.3.4
- `eslint`: ^9.21.0
- `eslint-plugin-react-hooks`: ^5.1.0
- `eslint-plugin-react-refresh`: ^0.4.19
- `globals`: ^15.15.0
- `vite`: ^6.2.0

## License

This project is open-source and available for use under the MIT License.

## Future Enhancements

1. Add multiple travel modes (walking, bicycling, transit)
2. Implement waypoints for multi-stop routes
3. Add route optimization features
4. Include traffic information
5. Add user authentication for saving favorite routes
6. Implement offline map caching
7. Add route sharing functionality
