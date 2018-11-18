module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          electron: '3.0',
        },
      },
    ],
    '@babel/preset-react',
  ],
  env: {
    test: {
      plugins: ['istanbul'],
    },
  },
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
}
