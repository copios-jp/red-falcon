import { dialog, Menu } from 'electron'
import { autoUpdater } from 'electron-updater'

autoUpdater.on('error', (error) => {
  dialog.showErrorBox('Error: ', error == null ? 'unknown' : (error.stack || error).toString())
})

autoUpdater.on('update-available', () => {
  dialog.showMessageBox(
    {
      type: 'info',
      title: '新しいバージョン',
      message: '新しいバージョンが利用可能です。 今すぐダウンロードしますか。',
      buttons: ['はい', 'いいえ'],
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
      title: 'インストール',
      message: 'アップデートのダウンロードが完了しました。 今すぐインストールしますか。',
      buttons: ['はい', 'いいえ'],
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        setImmediate(() => autoUpdater.quitAndInstall())
      }
    },
  )
})

export default {
  checkForUpdates() {
    autoUpdater.checkForUpdates()
  },
  install() {
    const menu = Menu.getApplicationMenu()
    menu.items[0].submenu.items[0].visible = false
    menu.items[0].submenu.items[1].visible = true
    setImmediate(() => autoUpdater.quitAndInstall())
  },
}
