import log from 'electron-log'

import development from './development/'
const tooling = { development }

export default {
  tooling: {},

  apply() {
    const env = process.env.NODE_ENV
    if (tooling[env]) {
      this.tooling = tooling[env]
      this.tooling.apply()
    }
    log.info('Apply tooling for:', env)
  },
}

