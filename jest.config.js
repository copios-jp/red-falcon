module.exports = {
  moduleNameMapper: {
    'electron-log': '<rootDir>/module_mocks/electron-log.js',
    'electron': '<rootDir>/module_mocks/electron.js',
  },
  testPathIgnorePatterns: ["/node_modules/"],
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
  clearMocks: true,
}
