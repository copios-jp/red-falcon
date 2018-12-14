import path from 'path'
import { app, crashReporter, BrowserWindow, Menu, ipcMain } from 'electron'
import log from 'electron-log'
import { autoUpdater } from 'electron-updater'

import tooling from './tooling/'
import menuTemplate from './menu_template'
import PowerSaveBlocker from './services/power_save_blocker/'
import scanner from './services/ant/Scanner'
import bridge from './services/bridge/'

// TODO - move this kind of setup out of index.js
autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'

tooling.logger = log
log.info(app.getName(), app.getVersion())

let mainWindow = null

crashReporter.start({
  productName: 'Beats',
  companyName: 'COPIOS',
  submitURL: 'copios.jp@gmail.com',
  uploadToServer: false,
})

app.on('ready', async () => {
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 640,
    minHeight: 480,
    show: false,
    titleBarStyle: 'hiddenInset',
  })

  mainWindow.loadFile(path.resolve(path.join(__dirname, '../renderer/index.html')))

  // show window once on first load
  mainWindow.webContents.once('did-finish-load', () => {
    bridge(scanner, mainWindow.webContents)
    mainWindow.show()
    autoUpdater.checkForUpdatesAndNotify()
    PowerSaveBlocker.activate()
    mainWindow.webContents.send('version', app.getVersion())

    app.on('activate', () => {
      mainWindow.show()
    })
  })

  mainWindow.webContents.on('will-navigate', () => {
    scanner.deactivate()
  })

  mainWindow.webContents.on('context-menu', (e, props) => {
    Menu.buildFromTemplate([
      {
        label: 'Inspect element',
        click() {
          mainWindow.inspectElement(props.x, props.y)
        },
      },
    ]).popup(mainWindow)
  })
})

app.on('before-quit', () => {
  PowerSaveBlocker.deactivate()
})

ipcMain.on('activate', () => {
  scanner.activate()
})

ipcMain.on('deactivate', () => {
  scanner.deactivate()
})
