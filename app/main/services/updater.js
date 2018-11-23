import { dialog, Menu } from 'electron'
// import { app } from 'electron'
import { autoUpdater } from 'electron-updater'

const DOWNLOAD_DIALOG = {
  type: 'info',
  title: '新しいバージョン',
  message: '新しいバージョンが利用可能です。 今すぐダウンロードしますか。',
  buttons: ['はい', 'いいえ'],
}

const INSTALL_DIALOG = {
  title: 'インストール',
  message: 'アップデートのダウンロードが完了しました。 今すぐインストールしますか。',
  buttons: ['はい', 'いいえ'],
}

const checkForUpdates = () => {
  autoUpdater.autoDownload = false
  autoUpdater.once('update-available', onUpdateAvailable)
  autoUpdater.checkForUpdates()
}

const install = () => {
  const menu = Menu.getApplicationMenu()
  const items = menu.items[0].submenu.items
  items[0].visible = false
  items[1].visible = true

  autoUpdater.autoDownload = true
  autoUpdater.quitAndInstall()
  /*
  app.relaunch({ argv: '--relaunch' })
  app.exit(0)
  */
}

autoUpdater.on('error', (error) => {
  dialog.showErrorBox('Error: ', error == null ? 'unknown' : (error.stack || error).toString())
})

const doDownload = () => {
  autoUpdater.once('update-downloaded', onUpdateDownloaded)
  autoUpdater.downloadUpdate()
}

const onUpdateAvailable = () => {
  dialog.showMessageBox(DOWNLOAD_DIALOG, (buttonIndex) => {
    if (buttonIndex === 0) {
      doDownload()
    }
  })
}

const onUpdateDownloaded = () => {
  const menu = Menu.getApplicationMenu()
  const items = menu.items[0].submenu.items
  items[0].visible = false
  items[1].visible = true

  dialog.showMessageBox(INSTALL_DIALOG, (buttonIndex) => {
    if (buttonIndex === 0) {
      install()
    }
  })
}

export default {
  checkForUpdates,
  install,
}
