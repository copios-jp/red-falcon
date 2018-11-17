{
  branch: 'master',
  repositoryUrl: 'https://copios-deploy@github.com/copios-jp/red-falcon.git',
  debug: true,
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/github', {
      assets: [
        { path: 'dist/*.dmg', label: 'OSX DMG' },
        { path: 'dist/latest-mac.yml' ,label: 'electron-updater latest version'},
        { path: 'dist/*.dmg.blockmap', label: 'blockmap for partial updates'},
        { path: 'dist/*.yaml', 'electron-updater build reference'}
      ]
    },
    ],
  ],
}
