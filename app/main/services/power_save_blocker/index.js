import { powerSaveBlocker } from 'electron'

export default {
  powerSaveId: undefined,

  isStarted() {
    return powerSaveBlocker.isStarted(this.powerSaveId)
  },

  activate() {
    if (this.isStarted()) {
      return
    }
    this.powerSaveId = powerSaveBlocker.start('prevent-display-sleep')
  },

  deactivate() {
    if (this.isStarted() === false) {
      delete this.powerSaveId
      return
    }
    powerSaveBlocker.stop(this.powerSaveId)
    delete this.powerSaveId
  },
}
