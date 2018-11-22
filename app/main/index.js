import path from 'path'
import { app, crashReporter, BrowserWindow, Menu } from 'electron'
import log from 'electron-log'
import { autoUpdater } from 'electron-updater'
import tooling from './tooling/'
import menuTemplate from './menu_template'

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'

tooling.logger = log

let mainWindow = null
let forceQuit = false

crashReporter.start({
  productName: 'Beats',
  companyName: 'COPIOS',
  submitURL: 'copios.jp@gmail.com',
  uploadToServer: false,
})

console.log('Starting', process.env.NODE_ENV)
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
    mainWindow.show()
  })

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.on('close', function(e) {
      if (!forceQuit) {
        e.preventDefault()
        mainWindow.hide()
      }
    })

    app.on('activate', () => {
      mainWindow.show()
    })

    app.on('before-quit', () => {
      forceQuit = true
    })
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

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify()
})
