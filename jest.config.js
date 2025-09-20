module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
  moduleNameMapper: {
    '^.+\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@tanstack/react-query)/)'
  ],
};
