import { app } from 'electron'
import updater from './services/updater'
import * as Sentry from '@sentry/electron'

export const QUIT = {
  label: app.getName(),
  submenu: [
    {
      label: 'Check for update',
      click() {
        updater.checkForUpdates()
      },
    },
    {
      label: 'Install and restart',
      click() {
        updater.install()
      },
      visible: false,
    },
    { type: 'separator' },
    {
      label: 'Error',
      click() {
        Sentry.captureMessage('production test')
      },
    },
    { type: 'separator' },
    { role: 'quit' },
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
