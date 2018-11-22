import { app } from 'electron'
import updater from './services/updater'
import * as Sentry from '@sentry/electron'

export const QUIT = {
  label: app.getName(),
  submenu: [
    {
      label: '更新を確認',
      click() {
        updater.checkForUpdates()
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
    { role: 'quit', label: '終了' },
  ],
}

export const WINDOW = {
  role: 'windowMenu',
  submenu: [
    { role: 'minimize' },
    { role: 'toggleFullScreen' },
    { type: 'separator' },
    { role: 'toggleDevTools', label: 'Dev Tools' },
  ],
}

export default [QUIT, WINDOW]
