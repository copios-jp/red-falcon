module.exports = {
  // runner: '@jest-runner/electron',
  moduleNameMapper: {
    'electron-log': '<rootDir>/module_mocks/electron-log.js',
    'electron': '<rootDir>/module_mocks/electron.js',
  },

  // testEnvironment: '@jest-runner/electron/environment',
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
}
