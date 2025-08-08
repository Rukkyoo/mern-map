// Test setup file
import '@testing-library/jest-dom';

// Mock Leaflet since it doesn't work well in test environment
global.L = {
  Icon: {
    Default: {
      prototype: {
        _getIconUrl: jest.fn()
      },
      mergeOptions: jest.fn()
    }
  },
  LatLngBounds: jest.fn(() => ({
    extend: jest.fn().mockReturnThis(),
  }))
};

// Mock react-leaflet components
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  Polyline: () => <div data-testid="polyline" />,
  useMap: () => ({
    setView: jest.fn(),
    fitBounds: jest.fn()
  })
}));

// Mock environment variables
Object.defineProperty(process.env, 'VITE_ORS_API_KEY', {
  value: 'test-api-key',
  writable: true
});

// Mock window.alert for tests
global.alert = jest.fn();

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};