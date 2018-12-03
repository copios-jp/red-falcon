module.exports = {
  moduleNameMapper: {
    'electron-log': '<rootDir>/module_mocks/electron-log.js',
    electron: '<rootDir>/module_mocks/electron.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
}
