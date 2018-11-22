import { app } from 'electron'
// import updater from './services/updater'

export const QUIT = {
  label: app.getName(),
  submenu: [
    /*
    {
      label: '更新を確認',
      click() {
       app.relaunch({argv: process.argv.slice(1).concat(['--relaunch'])})
       app.exit(0)
        // updater.checkForUpdates()
      },
    },
    {
      label: 'インストールして再起動',
      click() {
        updater.install()
      },
      visible: false,
    },
    { type: 'separator' },
    */
    { role: 'quit', label: '終了' },
  ],
}

export const WINDOW = {
  role: 'windowMenu',
  submenu: [
    { role: 'minimize', label: '最小化' },
    { role: 'toggleFullScreen', label: '最大化' },
    { type: 'separator' },
    { role: 'toggleDevTools', label: '開発ツール' },
  ],
}

export default [QUIT, WINDOW]
