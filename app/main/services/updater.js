import { dialog, Menu } from 'electron'
import { autoUpdater } from 'electron-updater'
import menuTemplate from '../menu_template'

autoUpdater.on('error', (error) => {
  dialog.showErrorBox(
    'Error: ',
    error == null ? 'unknown' : (error.stack || error).toString(),
  )
})

autoUpdater.on('update-available', () => {
  dialog.showMessageBox(
    {
    type: 'info',
    title: 'Found Updates',
    message: 'Found updates, do you want update now?',
    buttons: ['Sure', 'No'],
  },
  (buttonIndex) => {
    if (buttonIndex === 0) {
      autoUpdater.downloadUpdate()
    }
  },
  )
})

autoUpdater.on('update-downloaded', () => {
  const menu = Menu.getApplicationMenu()
  menu.items[0].submenu.items[0].visible = false
  menu.items[0].submenu.items[1].visible = true

  dialog.showMessageBox(
    {
    title: 'Install Updates',
    message: 'Updates downloaded. do you want to install now?',
    buttons: ['Sure', 'No'],
  },
  (buttonIndex) => {
    if(buttonIndex === 0) {
      autoUpdater.quitAndInstall()
    }
  },
  )
})

export default {
  checkForUpdates() {
    autoUpdater.checkForUpdates()
  },
  install() {
    menuTemplate[0].submenu[0].visible = true
    menuTemplate[0].submenu[1].visible = false
    autoUpdater.quitAndInstall()
  }
}

