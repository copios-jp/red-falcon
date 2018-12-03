module.exports = {
  moduleNameMapper: {
    'electron-log': '<rootDir>/module_mocks/electron-log.js',
    electron: '<rootDir>/module_mocks/electron.js',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
}
