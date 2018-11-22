import { autoUpdater } from 'electron-updater'
import { app } from 'electron'
const checkForUpdates = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      autoUpdater.emit('update-available')
      resolve({
        updateInfo: {
          version: '1',
          files: [],
          path: '',
          sha512: '',
          releaseName: '',
          releaseNotes: [],
          releaseDate: '',
          stagingPercientage: 100,
        },
        downloadPromise: new Promise(() => {}),
        cancellationToken: '',
        versionInfo: undefined,
      })
    }, 0)
  })
}

const downloadUpdate = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
      autoUpdater.emit('update-downloaded')
    }, 0)
  })
}

const quitAndInstall = () => {
  app.relaunch()
  app.quit()
}

export default {
  apply() {
    autoUpdater.checkForUpdates = checkForUpdates
    autoUpdater.downloadUpdate = downloadUpdate
    autoUpdater.quitAndInstall = quitAndInstall
  },
}
