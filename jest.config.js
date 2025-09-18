module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^.+\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@tanstack/react-query)/)'
  ],
};
