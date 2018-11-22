import { dialog, Menu } from 'electron'
// import { app } from 'electron'
import { autoUpdater } from 'electron-updater'

autoUpdater.on('error', (error) => {
  dialog.showErrorBox('Error: ', error == null ? 'unknown' : (error.stack || error).toString())
})

autoUpdater.on('update-available', () => {
  console.log(autoUpdater)
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

const relaunch = () => {
  autoUpdater.quitAndInstall()
  /*
   * app.relaunch({ argv: '--relaunch' })
  app.quit(0)
  */
}

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
        relaunch()
      }
    },
  )
})

export default {
  checkForUpdates() {
    autoUpdater.autoDownload = false
    autoUpdater.checkForUpdates()
  },
  install() {
    const menu = Menu.getApplicationMenu()
    menu.items[0].submenu.items[0].visible = false
    menu.items[0].submenu.items[1].visible = true
    relaunch()
  },
}
