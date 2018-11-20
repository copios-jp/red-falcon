import { app } from 'electron'

const QUIT = {
  label: app.getName(),
  submenu: [
    {
      role: 'quit',
    },
  ],
}

const WINDOW = {
  role: 'windowMenu',
  submenu: [
    { role: 'minimize' },
    { role: 'toggleFullScreen' },
    { type: 'separator' },
    { role: 'toggleDevTools', label: 'Dev Tools' },
  ],
}

export default [QUIT, WINDOW]
