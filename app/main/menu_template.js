import { app } from 'electron'

export const QUIT = {
  label: app.getName(),
  submenu: [{ role: 'quit', label: '終了' }],
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
