# 🗺️ MERN Map - Route Planner Application

A modern, responsive route planning application built with React, Leaflet, and multiple routing APIs. Features intelligent autocomplete, multiple API fallbacks, and a clean component-based architecture.

![Route Planner Demo](https://img.shields.io/badge/Status-Active-green) ![React](https://img.shields.io/badge/React-19.0.0-blue) ![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green)

## ✨ Features

### 🎯 Core Functionality
- **Smart Location Search**: Autocomplete with debounced search (300ms delay)
- **Multiple API Fallbacks**: Robust routing with automatic fallback systems
- **Interactive Map**: Leaflet-powered map with auto-fitting bounds
- **Real-time Route Calculation**: Distance and duration display
- **Responsive Design**: Works on desktop and mobile devices

### 🛡️ Reliability Features
- **API Fallback Chain**: 
  - Geocoding: Photon API → Nominatim API
  - Routing: OpenRouteService → OSRM → Straight Line
- **Error Handling**: Graceful degradation when services fail
- **Loading States**: Visual feedback during API calls
- **Input Validation**: Prevents invalid route calculations

### 🎨 User Experience
- **Modern UI**: Clean design with Tailwind CSS v4
- **Hover Effects**: Interactive suggestions and buttons
- **Auto-fitting Map**: Automatically zooms to show entire route
- **Visual Route Display**: Blue polyline with origin/destination markers

## 🏗️ Architecture

### 📁 Project Structure
```
mern-map/
├── src/
│   ├── components/           # UI Components (Reusable)
│   │   ├── LocationInput.jsx     # Input field for locations
│   │   ├── SuggestionsList.jsx   # Autocomplete dropdown
│   │   ├── RouteForm.jsx         # Form with inputs + button
│   │   ├── RouteInfo.jsx         # Distance/duration display
│   │   └── MapView.jsx           # Leaflet map component
│   │
│   ├── hooks/               # Custom Logic Hooks
│   │   ├── useGeocoding.js      # Location search logic
│   │   └── useRouting.js        # Route calculation logic
│   │
│   ├── __tests__/           # Test Suite
│   │   ├── components/          # Component tests
│   │   ├── hooks/              # Hook tests
│   │   ├── setup.js            # Test configuration
│   │   └── Map.integration.test.jsx # Integration tests
│   │
│   ├── Map.jsx              # Main component
│   ├── App.jsx              # App entry point
│   └── index.css            # Global styles
│
├── backend/                 # Express server (optional)
├── jest.config.js          # Test configuration
└── package.json            # Dependencies
```

### 🧩 Component Architecture

#### **Separation of Concerns**
- **Components Folder**: UI elements (what users see and interact with)
- **Hooks Folder**: Business logic (API calls, state management, data processing)

#### **Component Hierarchy**
```
MappingComponent (Main)
├── RouteForm
│   ├── LocationInput (Origin)
│   ├── LocationInput (Destination)
│   └── SuggestionsList
├── RouteInfo
└── MapView
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/Rukkyoo/mern-map.git>
   cd mern-map
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional)
   ```bash
   # Create .env file
   VITE_ORS_API_KEY=your_openrouteservice_api_key
   ```
   > **Note**: The app works without API keys using free fallback services

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```


## 🔧 API Services

### Geocoding (Location Search)
1. **Primary**: [Photon API](https://photon.komoot.io/) - Free, no API key required
2. **Fallback**: [Nominatim API](https://nominatim.openstreetmap.org/) - Free, no API key required

### Routing (Route Calculation)
1. **Primary**: [OpenRouteService](https://openrouteservice.org/) - Requires API key
2. **Fallback**: [OSRM](http://project-osrm.org/) - Free, no API key required
3. **Last Resort**: Straight line calculation using Haversine formula

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm start            # Start backend server (if needed)
```

### Key Technologies
- **Frontend**: React 19, Leaflet, Tailwind CSS v4
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Backend**: Express.js (optional)

## 🎯 Usage Examples

### Basic Usage
1. Type a location in the "Origin" field
2. Select from autocomplete suggestions
3. Type a destination in the "Destination" field
4. Select from autocomplete suggestions
5. Click "Calculate Route"
6. View route on map with distance/duration info

### Advanced Features
- **Debounced Search**: Wait 300ms after typing before searching
- **Auto-fitting Map**: Map automatically zooms to show entire route
- **Error Recovery**: App continues working even if some APIs fail
- **Loading States**: Visual feedback during API calls

## 🔍 Troubleshooting

### Common Issues

**Autocomplete not working?**
- Check internet connection
- Both Photon and Nominatim APIs are free and should work without keys

**Route calculation failing?**
- Ensure both origin and destination are selected
- App will fall back to OSRM if OpenRouteService fails
- Last resort: straight line distance calculation

**Map not displaying?**
- Check if Leaflet CSS is properly imported
- Ensure container has proper height/width


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines
- Write tests for new components and hooks
- Follow the existing component/hook separation pattern
- Use TypeScript-style JSDoc comments
- Ensure responsive design
- Test with multiple API failure scenarios

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenStreetMap](https://www.openstreetmap.org/) for map data
- [Leaflet](https://leafletjs.com/) for the mapping library
- [Photon](https://photon.komoot.io/) for geocoding services
- [OSRM](http://project-osrm.org/) for routing services
- [OpenRouteService](https://openrouteservice.org/) for premium routing

## 📞 Support

If you have any questions or need help:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

---

**Built with ❤️ using React and modern web technologies**