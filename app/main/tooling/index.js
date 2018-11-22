import development from './development/'
import production from './production/'

const tooling = { development, production }

export default {
  tooling: {},

  apply() {
    const env = process.env.NODE_ENV
    if (tooling[env]) {
      this.tooling = tooling[env]
      this.tooling.apply()
    }
  },
}
