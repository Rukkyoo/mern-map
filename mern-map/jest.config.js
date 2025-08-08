export const testEnvironment = 'jsdom';
export const setupFilesAfterEnv = ['<rootDir>/src/__tests__/setup.js'];
export const moduleNameMapping = {
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub'
};
export const transform = {
  '^.+\\.(js|jsx)$': 'babel-jest'
};
export const testMatch = [
  '<rootDir>/src/__tests__/**/*.{js,jsx}',
  '<rootDir>/src/**/*.{test,spec}.{js,jsx}'
];
export const collectCoverageFrom = [
  'src/**/*.{js,jsx}',
  '!src/__tests__/**',
  '!src/main.jsx'
];
export const coverageThreshold = {
  global: {
    branches: 50,
    functions: 50,
    lines: 50,
    statements: 50
  }
};
export const extensionsToTreatAsEsm = ['.jsx'];
export const globals = {
  'ts-jest': {
    useESM: true
  }
};
export const testTimeout = 10000;