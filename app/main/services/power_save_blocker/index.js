import { powerSaveBlocker } from 'electron'

export default {
  blockId: undefined,

  isStarted() {
    return this.blockId && powerSaveBlocker.isStarted(this.blockId)
  },

  activate() {
    if (this.isStarted()) {
      return
    }
    this.blockId = powerSaveBlocker.start('prevent-display-sleep')
  },

  deactivate() {
    if (this.isStarted() === false) {
      return
    }
    powerSaveBlocker.stop(this.blockId)
  },
}
